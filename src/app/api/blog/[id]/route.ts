import { dbConnect } from "@/lib/db";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";
import logger from "@/lib/logger";
import { AppError } from "@/lib/error";
import { auth } from "../../../../../auth";
import { uploadToCloudinary } from "@/lib/cloudinary";

import mongoose from "mongoose";

export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  // Validate ID format
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    logger.warn(`Invalid Blog ID provided: ${id}`);
    return NextResponse.json({ message: "Invalid Blog ID" }, { status: 400 });
  }

  try {
    // Connect to the database
    await dbConnect();

    // Find and delete the blog by ID
    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      logger.warn(`Blog not found with ID: ${id}`);
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    logger.info(`Blog with ID: ${id} deleted successfully.`);
    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    // Log detailed error context
    logger.error(`Error deleting blog with ID ${id}: ${error}`, {
      stack: error,
    });

    return NextResponse.json(
      { message: "Something went wrong", error: error },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  const params = await context.params;

  const { id } = params;

  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { message: "You must log in to update a blog post." },
      { status: 401 }
    );
  }

  try {
    const formData = await request.formData();
    const title = formData.get("title") as string | null;
    const description = formData.get("description") as string | null;
    const hashtags = formData.get("hashtags") as string | null; // Expected as a comma-separated string
    const file = formData.get("image") as File | null;

    // Process hashtags if provided
    let hashtagArray: string[] = [];
    if (hashtags) {
      hashtagArray = hashtags
        .split(",")
        .map((tag) => tag.trim().toLowerCase()) // Normalize hashtags
        .filter((tag) => tag.length > 0); // Remove empty entries
    }

    // Find the blog post by ID
    await dbConnect();
    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json(
        { message: "Blog post not found." },
        { status: 404 }
      );
    }

    // If a new image is uploaded, handle the image upload to Cloudinary
    let imageUrl: string | undefined;
    if (file) {
      if (!file.type.startsWith("image/")) {
        return NextResponse.json(
          { message: "Invalid file type. Please upload an image." },
          { status: 400 }
        );
      }

      // Upload image to Cloudinary
      const uploadedImageData = await uploadToCloudinary(file, "blogs");
      imageUrl = uploadedImageData.secure_url;
    }

    // Prepare the update data
    const updateData: Partial<typeof blog> = {};

    // Update fields only if new values are provided
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (hashtagArray.length > 0) updateData.hashtags = hashtagArray;
    if (imageUrl) updateData.image = imageUrl; // Update only if a new image is provided

    // If no data to update, return a message
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { message: "No data to update." },
        { status: 400 }
      );
    }

    // Update the blog post
    const updatedBlog = await Blog.findByIdAndUpdate(
      params.id,
      { $set: updateData }, // Only set the fields that were updated
      { new: true, runValidators: true } // Ensure validation on update
    );

    if (!updatedBlog) {
      return NextResponse.json(
        { message: "Error updating blog post." },
        { status: 500 }
      );
    }

    logger.info(`Blog updated successfully: ${updatedBlog._id}`);

    return NextResponse.json(
      { message: "Blog updated successfully", data: updatedBlog },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof AppError) {
      logger.error(`AppError: ${error.message}`);
      return NextResponse.json(
        { message: error.message },
        { status: error.statusCode }
      );
    }

    // Log unexpected errors
    logger.error(
      `Unexpected error: ${error instanceof Error ? error.message : error}`
    );
    return NextResponse.json(
      {
        message: "An unexpected error occurred.",
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
