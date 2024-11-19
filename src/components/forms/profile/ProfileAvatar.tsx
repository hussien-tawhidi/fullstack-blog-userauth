import React from "react";
import Image from "next/image";
import { MdVerifiedUser } from "react-icons/md";
import { CiWarning } from "react-icons/ci";

interface ProfileAvatarProps {
  avatar: string;
  isVerified: boolean;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  avatar,
  isVerified,
}) => {
  return (
    <div className='relative flex items-center justify-center h-[150px] w-[150px] mx-auto'>
      <Image
        src={avatar || "https://github.com/shadcn.png"}
        alt='avatar'
        width={500}
        height={500}
        className='overflow-hidden h-[150px] w-auto rounded-full object-cover'
      />
      <span className='absolute bottom-0 right-[20px]'>
        {isVerified ? (
          <MdVerifiedUser className='text-xl text-blue-500' />
        ) : (
          <span className='bg-red-400/50 flex text-[8px] px-2 rounded-md font-semibold items-center justify-center'>
            Verify your email <CiWarning className='text-lg text-red-800' />
          </span>
        )}
      </span>
    </div>
  );
};

export default ProfileAvatar;
