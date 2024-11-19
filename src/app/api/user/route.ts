import { dbConnect } from "@/lib/db";
import user from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await dbConnect();

  const users = await user.find();
  return NextResponse.json({
    message: "Successfully fetched users",
    data: users,
    status: 200,
  });
}
