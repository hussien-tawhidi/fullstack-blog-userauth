import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide username"],
  },
  bio: {
    type: String,
    default: "Write you mean Idea ...",
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
  },
  emailToken: { type: String, required: true },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  avatar: { type: String, trim: true, default: "" },
  isVerified: {
    type: Boolean,
    default: false,
  },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
