import { dbConnect } from "@/lib/db";
import logger from "@/lib/logger";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  try {
     const blogPosts = await Blog.find({}).sort({ date: -1 });

    if (blogPosts.length === 0) {
      return NextResponse.json({
        message: "No blog posts found",
        status: 200,
      });
    }
    // Returning a successful response with the blog posts
    return NextResponse.json({
      message: "Successfully fetched blog posts",
      data: blogPosts,
      status: 200,
    });
  } catch (error) {
    // Log the error for server-side debugging
    logger.error("Error fetching blog posts:", error);

    // Returning an error response
    return NextResponse.json(
      {
        message: "Error fetching blog posts",
        error: error || "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}
