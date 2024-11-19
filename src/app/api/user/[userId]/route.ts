import { uploadToCloudinary } from "@/lib/cloudinary";
import { dbConnect } from "@/lib/db";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  context: { params: { userId: string } }
) {
  const { userId } = await context.params; // Extract userId from the context

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    await dbConnect(); // Ensure MongoDB connection

    const formData = await request.formData();
    const name = formData.get("name") as string | null;
    const email = formData.get("email") as string | null;
    const bio = formData.get("bio") as string | null;
    const avatar = formData.get("avatar") as File | null;

    let imageUrl: string | undefined;
    if (avatar) {
      if (!avatar.type.startsWith("image/")) {
        return NextResponse.json(
          { message: "Invalid file type. Please upload an image." },
          { status: 400 }
        );
      }

      const uploadedImageData = await uploadToCloudinary(avatar, "blogs");
      imageUrl = uploadedImageData.secure_url;
    }

    // Dynamically construct the fields to update
    const updateFields: Partial<{
      name: string;
      email: string;
      avatar: string;
      bio: string;
    }> = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (imageUrl) updateFields.avatar = imageUrl;
    if (bio) updateFields.bio = bio;

    // Update user
    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
      new: true, // Return the updated document
      runValidators: true, // Apply schema validations
    });

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return the updated user
    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.error("Error updating user:", error.message);

    // Handle specific MongoDB errors (e.g., validation errors)
    if (error.name === "ValidationError") {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
