import { dbConnect } from "@/lib/db";
import { AppError } from "@/lib/error";
import logger from "@/lib/logger";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";
import { auth } from "../../../../../../../auth";

export async function POST(
  request: Request,
  context: { params: { blogId: string } }
) {
  await dbConnect();
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { message: "You must log in to comment on a blog post." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    const { blogId } = context.params;

    // Parse comment data from the request body
    const { comment } = body;

    if (!comment || comment.trim() === "") {
      return NextResponse.json(
        { message: "Comment cannot be empty." },
        { status: 400 }
      );
    }

    // Connect to the database

    // Find the blog post by ID
    const blog = await Blog?.findById(blogId);
    if (!blog) {
      return NextResponse.json(
        { message: "Blog post not found." },
        { status: 404 }
      );
    }

    // Add the comment to the blog post
    const newComment = {
      userId: session.user._id,
      username: session.user.name,
      avatar: session.user.avatar,
      comment: comment.trim(),
      date: new Date(),
    };

    blog?.comments?.push(newComment);

    // Save the updated blog post
    await blog.save();

    logger.info(`Comment added to blog: ${blogId}`);

    return NextResponse.json(
      { message: "Comment added successfully.", data: newComment },
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

export async function GET(
  request: Request,
  context: { params: { blogId: string } }
) {
  const params = await context.params;

  const { blogId } = params;

  if (!blogId) {
    logger.error("No blogId provided in params");
    return NextResponse.json(
      { message: "Blog ID is required." },
      { status: 400 }
    );
  }

  try {
    // Connect to the database
    await dbConnect();

    // Find the blog post by ID
    const blog = await Blog.findById(blogId).select("comments");
    if (!blog) {
      return NextResponse.json(
        { message: "Blog post not found." },
        { status: 404 }
      );
    }

    // Return the comments of the blog post
    return NextResponse.json(
      { message: "Comments fetched successfully.", data: blog.comments },
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
