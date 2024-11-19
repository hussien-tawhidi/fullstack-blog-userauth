import { dbConnect } from "@/lib/db";
import { AppError } from "@/lib/error";
import logger from "@/lib/logger";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function POST(request: Request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { message: "You must log in to create a blog post." },
      { status: 401 }
    );
  }

  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const hashtags = formData.get("hashtags") as string; // Expected as a comma-separated string
    const file = formData.get("image") as File;

    // Validate input data
    if (!title || !description) {
      return NextResponse.json(
        { message: "Title and description are required." },
        { status: 400 }
      );
    }

    // Process hashtags
    let hashtagArray: string[] = [];
    if (hashtags) {
      hashtagArray = hashtags
        .split(",")
        .map((tag) => tag.trim().toLowerCase()) // Normalize hashtags
        .filter((tag) => tag.length > 0); // Remove empty entries
    }

    // Validate file upload (must be an image)
    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded. Please upload an image." },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { message: "Invalid file type. Please upload an image." },
        { status: 400 }
      );
    }

    // Upload image to Cloudinary
    const uploadedImageData = await uploadToCloudinary(file, "blogs");
    const imageUrl = uploadedImageData.secure_url;

    // Connect to database
    await dbConnect();

    // Create new blog entry
    const newBlog = await Blog.create({
      title,
      description,
      username: session.user.name,
      userAvatar: session.user.avatar,
      role: session.user.role,
      userId: session.user._id,
      image: imageUrl, // Store the secure URL of the image
      hashtags: hashtagArray, // Store processed hashtags
    });

    logger.info(`Blog created successfully: ${newBlog._id}`);

    return NextResponse.json(
      { message: "Blog created successfully", data: newBlog },
      { status: 201 }
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
