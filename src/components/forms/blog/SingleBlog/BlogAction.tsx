"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import TextInput from "../TextInput";
import TextareaInput from "../TextareaInput";
import FileInput from "../FileInput";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";

interface Props {
  blogId: string;
  initialData?: {
    title: string;
    description: string;
    hashtags: string[];
    imageUrl: string;
  };
}

const BlogAction = ({ blogId, initialData }: Props) => {
  // Set the default values if `initialData` is provided
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(
    initialData?.imageUrl || ""
  );
  const [title, setTitle] = useState<string>(initialData?.title || "");
  const [description, setDescription] = useState<string>(
    initialData?.description || ""
  );
  const [hashtags, setHashtags] = useState<string[]>(
    initialData?.hashtags || []
  );

  // Error and success messages
  const [imageError, setImageError] = useState<string | null>(null);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [hashtagsError, setHashtagsError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      const maxSize = 2 * 1024 * 1024; // 2 MB

      if (!validTypes.includes(file.type)) {
        setImageError("Only JPEG, PNG, and GIF files are allowed.");
        setImageFile(null);
        setImageUrl(null);
        return;
      }

      if (file.size > maxSize) {
        setImageError("Image size must be less than 2 MB.");
        setImageFile(null);
        setImageUrl(null);
        return;
      }

      setImageError(null);
      setImageFile(file);
      const imagePreviewUrl = URL.createObjectURL(file);
      setImageUrl(imagePreviewUrl);
    }
  };

  const handleDelete = async () => {
    const data = await axios.delete(`/api/blog/${blogId}`);
    if (!data.data) {
      toast.error("Couldn't delete");
    }
    toast.success("Success Deleted");
    router.push("/");
  };

  const handleUpdate = async () => {
    setIsLoading(true); // Set loading to true while the request is being made
    try {
      // Reset error messages
      setTitleError(null);
      setDescriptionError(null);
      setHashtagsError(null);
      setImageError(null);

      // Validate inputs
      if (!title) {
        setTitleError("Title is required.");
        setIsLoading(false);
        return;
      }

      if (!description) {
        setDescriptionError("Description is required.");
        setIsLoading(false);
        return;
      }

      if (hashtags.length === 0) {
        setHashtagsError("At least one hashtag is required.");
        setIsLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("hashtags", hashtags.join(","));

      if (imageFile) {
        formData.append("image", imageFile); // Append the image file
      }

      const response = await fetch(`/api/blog/${blogId}`, {
        method: "PUT",
        body: formData, // Send FormData instead of JSON
      });

      if (response.ok) {
        toast.success("Post has successfully updated");
        router.refresh();
        setSuccessMessage("Blog updated successfully!");
      } else {
        const error = await response.json();
        console.error("Error:", error);
        toast.error(`Error updating blog=${error.message}`);
        if (error.message) {
          setTitleError(error.message);
        }
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      setTitleError("An unexpected error occurred while updating the blog.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex gap-5'>
      <Button
        className='flex items-center gap-3 border px-3 my-2 py-1.5 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 transition-all duration-100 ease-in-out'
        variant='outline'
        onClick={handleDelete}>
        Delete <MdDeleteOutline />
      </Button>
      <Dialog>
        <DialogTrigger className='flex items-center gap-3 border px-3 my-2 py-1.5 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 transition-all duration-100 ease-in-out'>
          Edite <FaRegEdit />{" "}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Blog</DialogTitle>
            <DialogDescription>
              <TextInput
                className='my-5'
                label='Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Title'
                error={titleError}
              />
              <TextareaInput
                label='Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Description'
                error={descriptionError}
                className='mt-5'
              />
              <FileInput onChange={handleImageChange} error={imageError} />
              {imageUrl && (
                <Image
                  height={80}
                  className='my-2 rounded-md'
                  src={imageUrl}
                  alt='Preview'
                  width={100}
                />
              )}{" "}
              {/* Preview image */}
              <TextInput
                label='Hashtags'
                value={hashtags.join(", ")}
                onChange={(e) => setHashtags(e.target.value.split(", "))}
                placeholder='Hashtags (comma separated)'
                error={hashtagsError}
              />
              <Button
                variant='outline'
                onClick={handleUpdate}
                disabled={isLoading}
                type='submit'
                className='my-3'>
                {isLoading ? "Updating..." : "Update Blog"}
              </Button>
              {successMessage && (
                <span className='block my-3'>{successMessage}</span>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogAction;
