"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import CommentForm from "./CommentForm";
import CommentList from "./CommentsLists";
import axios from "axios";
// Define the types for comments and props
interface Comment {
  userId: string;
  username: string;
  avatar?: string;
  comment: string;
  date: string; // Date stored as ISO string
}

interface CommentsProps {
  blogId: string;
}

const Comments: React.FC<CommentsProps> = () => {
  const params = useParams();
  const { blogId } = params;
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Fetch comments when component mounts
  const fetchComments = async () => {
    try {
      const res = await axios.get(`/api/blog/postComment/${blogId}/comments`);
      setComments(res?.data?.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load comments.");
    }
  };
  useEffect(() => {
    fetchComments();
  }, [blogId]);

  // Handle new comment submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.trim()) {
      setError("Comment cannot be empty.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`/api/blog/postComment/${blogId}/comments`, {
        comment: newComment,
      });

      setComments((prev) => [res?.data?.data, ...prev]); // Prepend the new comment
      setNewComment(""); // Clear input field
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err?.response?.data?.message || "Failed to post comment.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full max-w-3xl mx-auto mt-8'>
      <h2 className='text-2xl font-semibold mb-4'>Comments</h2>
      <CommentForm
        newComment={newComment}
        setNewComment={setNewComment}
        handleSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
      <CommentList comments={comments} />
    </div>
  );
};

export default Comments;
