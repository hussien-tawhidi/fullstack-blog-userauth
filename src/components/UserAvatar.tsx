"use client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface props {
  avatar?: string | any;
}

export default function UserAvatar({ avatar }: props) {
  return (
    <Avatar className='w-5 h-5 cursor-pointer'>
      <AvatarImage src={avatar || "https://github.com/shadcn.png"} />
      <AvatarFallback>User</AvatarFallback>
    </Avatar>
  );
}
