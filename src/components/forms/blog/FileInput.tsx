"use client";

import Image from "next/image";
import React, { useState } from "react";
import { IoCameraOutline } from "react-icons/io5";

interface Props {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  error?: string | null;
}

const FileInput: React.FC<Props> = ({ onChange, error }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a preview URL for the image
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null); // Reset the preview if no file is selected
    }

    onChange(e); // Call the parent onChange handler
  };

  return (
    <span className='mb-2 flex gap-3 items-center'>
      <span className=''>
        <label className='mb-2 cursor-pointer text-sm w-[50px] h-[50px] rounded-full border flex items-center justify-center relative'>
          <IoCameraOutline className='text-gray-700 dark:text-gray-200 font-semibold text-xl' />
          <input
            type='file'
            accept='image/*'
            onChange={handleFileChange}
            className='hidden'
          />
        </label>
        {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
      </span>
      {previewUrl && (
        <span className='w-[100px] h-[100px] rounded-lg overflow-hidden'>
          <Image
            src={previewUrl}
            alt='Preview'
            height={200}
            width={200}
            className='w-96 h-auto'
          />
        </span>
      )}
    </span>
  );
};

export default FileInput;
