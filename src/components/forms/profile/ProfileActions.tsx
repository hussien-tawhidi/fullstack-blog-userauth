"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FaRegEdit } from "react-icons/fa";
import { logOut } from "@/actions/socialLogin";
import TextInput from "../blog/TextInput";
import TextareaInput from "../blog/TextareaInput";
import FileInput from "../blog/FileInput";
import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const ProfileActions: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>("");

  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState<string | null>("");

  const { data: session } = useSession();
  const userId = session?.user?._id;

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (imageFile) {
      formData.append("avatar", imageFile); // Add the file to the request
    }
    try {
      const response = await axios.put(`/api/user/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure the server knows it's a file upload
        },
      });

      // check if the login and user_progile_id are not the same
      const updatedUserId = response?.data?._id;
      if (!response && !userId === updatedUserId) {
        throw new Error("Failed to update profile");
      }
      toast.success("Profile updated successfully!");
      logOut();
      router.push("/signin");
    } catch (err: any) {
      toast.error("Failed to update profile. Please try again.", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center'>
      <Dialog>
        <DialogTrigger className='flex'>
          <span className='flex items-center transition-all duration-200 hover:bg-gray-400 dark:hover:bg-gray-800 py-2.5 px-4 rounded-md gap-2 text-[14px] tracking-wider'>
            Edite <FaRegEdit />{" "}
          </span>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Your Info</DialogTitle>
            <DialogDescription>
              <TextInput
                className='my-5'
                label='Full Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Your Full Name ...'
              />
              <TextInput
                className='my-5'
                label='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='me@info.com'
              />
              <TextareaInput
                label='Bio'
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder='What is in your mind?'
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
              <Button
                variant='outline'
                onClick={handleSubmit}
                disabled={isLoading}
                type='submit'
                className='my-3'>
                {isLoading ? "Updating..." : "Update Blog"}
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Button variant='outline' onClick={() => router.push("/blog/create")}>
        Create new
      </Button>
      <Button onClick={logOut}>Sign Out</Button>
    </div>
  );
};

export default ProfileActions;
