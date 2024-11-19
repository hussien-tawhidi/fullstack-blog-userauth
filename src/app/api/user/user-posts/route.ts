import { dbConnect } from "@/lib/db";
import { auth } from "../../../../../auth";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

const logger = console; // Replace with a logging library like `winston` or `pino` for production

export async function GET() {
  await dbConnect(); // Ensure database connection

  const session = await auth();
  if (!session || !session.user || !session.user._id) {
    return errorResponse("Unauthorized access. User not authenticated.", 401);
  }

  const userId = session?.user?._id;
  // console.log(userId)
  try {
    const posts = await Blog.find({ userId });
    
    return NextResponse.json({
      message: "Successfully fetched posts from the database.",
      data: posts,
      status: 200,
    });
  } catch (error) {
    logger.error("Error fetching posts from database:", error);
    return errorResponse("An error occurred while fetching posts.", 500);
  }
}

// Utility function for creating error responses
function errorResponse(message: string, status: number) {
  return NextResponse.json(
    {
      message,
      status,
    },
    { status }
  );
}
