import mongoose, { Schema, Document, Model } from "mongoose";

// Define the role types for stricter typing
type Role = "admin" | "user" | "editor" | "guest";

export interface IComment {
  userId: string;
  username: string;
  avatar?: string;
  comment: string;
  date?: Date;
  likes?: number; // Number of likes for the comment
  likedBy?: string[]; // Array of user IDs who liked the comment
}

export interface IBlog extends Document {
  title: string;
  description: string;
  date?: Date;
  username: string;
  avatar?: string;
  role: Role;
  userId: string;
  image?: string;
  hashtags?: string[];
  comments?: IComment[]; // Array of comments
  likes?: number; // Number of likes for the blog post
  likedBy?: string[]; // Array of user IDs who liked the blog post
}

// Define the comment schema
const commentSchema: Schema<IComment> = new Schema(
  {
    userId: { type: String, required: true, trim: true },
    username: { type: String, required: true, trim: true },
    avatar: { type: String, trim: true },
    comment: { type: String, required: true, trim: true },
    date: { type: Date, default: Date.now }, // Automatically set the comment date
    likes: { type: Number, default: 0 }, // Default to 0 likes
    likedBy: { type: [String], default: [] }, // List of user IDs who liked the comment
  },
  {
    _id: false, // Prevent creating a separate ObjectId for subdocuments
  }
);

// Define the blog schema
const blogSchema: Schema<IBlog> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    date: { type: Date, default: Date.now },
    username: { type: String, required: true, trim: true },
    avatar: { type: String, trim: true },
    role: {
      type: String,
      default: "guest",
      enum: ["admin", "user", "editor", "guest"],
    },
    userId: { type: String, required: true, trim: true },
    image: { type: String, trim: true },
    hashtags: { type: [String], default: [], trim: true }, // Array of strings with a default empty array
    comments: { type: [commentSchema], default: [] }, // Embedded comments
    likes: { type: Number, default: 0 }, // Number of likes for the blog post
    likedBy: { type: [String], default: [] }, // List of user IDs who liked the blog post
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create or retrieve the model
const Blog: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", blogSchema);

export default Blog;
