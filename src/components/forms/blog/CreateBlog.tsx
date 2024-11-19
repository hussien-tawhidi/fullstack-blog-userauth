"use client";

import axios from "axios";
import { useState } from "react";
import CreateBlogForm from "./CreateBlogForm";
import { useRouter } from "next/navigation";

export default function CreateBlogPostForm() {
  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hashtags, setHashtags] = useState<string>(""); // Comma-separated string
  const [loading, setLoading] = useState(false);

  // Individual error messages
  const [imageError, setImageError] = useState<string | null>(null);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [hashtagsError, setHashtagsError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      const maxSize = 2 * 1024 * 1024; // 2 MB

      if (!validTypes.includes(file.type)) {
        setImageError("Only JPEG, PNG, and GIF files are allowed.");
        setImage(null);
        return;
      }

      if (file.size > maxSize) {
        setImageError("Image size must be less than 2 MB.");
        setImage(null);
        return;
      }
    }

    setImageError(null);
    setImage(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;

    // Validate Image
    if (!image) {
      setImageError("Image is required!");
      isValid = false;
    } else {
      setImageError(null);
    }

    // Validate Title
    if (title.trim().length < 3) {
      setTitleError("Title must be at least 3 characters long.");
      isValid = false;
    } else {
      setTitleError(null);
    }

    // Validate Description
    if (description.trim().length < 10) {
      setDescriptionError("Description must be at least 10 characters long.");
      isValid = false;
    } else {
      setDescriptionError(null);
    }

    // Validate Hashtags
    if (hashtags.trim() && !/^([\w]+,?\s?)+$/.test(hashtags.trim())) {
      setHashtagsError("Hashtags must be comma-separated words.");
      isValid = false;
    } else {
      setHashtagsError(null);
    }

    if (!isValid) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", image as Blob);
      formData.append("title", title.trim());
      formData.append("description", description.trim());
      formData.append("hashtags", hashtags.trim()); // Include hashtags

      const response = await axios.post("/api/blog/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccessMessage(response.data.message);
      setTitle("");
      setDescription("");
      setHashtags("");
      setImage(null);
      router.push("/");
    } catch (error) {
      setSuccessMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto p-4 flex flex-col justify-center bg-opacity-60 items-center bg-[url('/images/bg.jpg')] bg-cover h-screen overflow-hidden">
      <div className='backdrop-blur-sm backdrop-filter backdrop-grayscale md:p-10 rounded-md'>
        <CreateBlogForm
          hashtagsError={hashtagsError}
          setHashtags={setHashtags}
          hashtags={hashtags}
          description={description}
          setDescription={setDescription}
          title={title}
          setTitle={setTitle}
          handleImageChange={handleImageChange}
          handleSubmit={handleSubmit}
          imageError={imageError}
          descriptionError={descriptionError}
          loading={loading}
          successMessage={successMessage}
          titleError={titleError}
        />
      </div>
    </div>
  );
}
