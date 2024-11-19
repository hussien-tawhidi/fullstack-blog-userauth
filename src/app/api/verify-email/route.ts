import { dbConnect } from "@/lib/db";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Extract the token from the query string
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return NextResponse.json({ message: "Token is missing" }, { status: 400 });
  }

  try {
    await dbConnect();
    await User.findOneAndUpdate(
      { emailToken: token },
      { emailToken: null, isVerified: true },
      { new: true }
    );

    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during email verification:", error);
    return NextResponse.json(
      { message: "Error verifying email" },
      { status: 500 }
    );
  }
}
