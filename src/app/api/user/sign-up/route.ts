import bcryptjs from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { dbConnect } from "@/lib/db";
import User from "@/models/user";
import { sendVerificationEmail } from "@/lib/mail";
import { NextRequest, NextResponse } from "next/server";
import logger from "@/lib/logger";

export async function POST(request: NextRequest) {
  await dbConnect();
  const emailToken = uuidv4();
  try {
    const reqBody = await request.json();
    const { name, email, password } = reqBody;
    const user = await User.findOne({ email });

    if (user) {
      logger.warn(`User with email ${email} already exists`);
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      emailToken,
    });

    const savedUser = await newUser.save();
    await sendVerificationEmail(email, emailToken);
    logger.info(`User created successfully: ${savedUser._id}`);

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error) {
    logger.error(`Error in sign up: ${error}`);
    return NextResponse.json({ error: "Error in sign up" }, { status: 500 });
  }
}
