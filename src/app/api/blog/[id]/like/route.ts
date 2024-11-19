import Blog from "@/models/blog";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../../auth";
import logger from "@/lib/logger";

export async function POST(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const session = await auth();
  const { id } = await context.params;
  const userId = session?.user?._id; // Get userId from the session

  if (!userId) {
    logger.warn("User ID is missing in the session.");
    return NextResponse.json(
      { message: "User ID is required" },
      { status: 400 }
    );
  }

  try {
    const blog = await Blog.findById(id); // Find the blog post by its ID

    if (!blog) {
      logger.info(`Blog with ID ${id} not found.`);
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    // Check if the user has already liked the post
    if (blog?.likedBy?.includes(userId)) {
      logger.info(`User ${userId} attempted to like the blog post again.`);
      return NextResponse.json(
        { message: "You have already liked this post" },
        { status: 400 }
      );
    }

    // Increment likes and add userId to likedBy
    blog.likes = (blog.likes ?? 0) + 1; // Increment likes safely
    blog.likedBy = [...(blog.likedBy || []), userId]; // Add userId to likedBy array

    // Save the updated blog post
    await blog.save();

    logger.info(`User ${userId} liked the blog post with ID ${id}.`);
    return NextResponse.json({
      likes: blog.likes,
      likedBy: blog.likedBy,
    });
  } catch (error) {
    logger.error(`Error liking the blog post: ${error}`, { error });
    return NextResponse.json(
      { message: "Server error", error: error },
      { status: 500 }
    );
  }
}
