"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { ToggleMode } from "../ToggleMode";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IoCreateOutline } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserMenu from "./UserMenu";
import { useSession } from "next-auth/react";

interface Props {
  avatar: string | null | undefined;
}

const Header = ({ avatar }: Props) => {
  const { theme } = useTheme();
  const { data: session } = useSession();
  return (
    <div className='flex place-items-center overflow-hidden relative py-3 h-16 border-b-[0.5px] border-gray-400'>
      <section className='relative mx-auto'>
        <nav className='flex justify-between text-gray-600 dark:text-gray-100 w-screen'>
          <div className='px-5 xl:px-12 py-6 flex w-full items-center justify-between'>
            <div className='flex items-center justify-center gap-2'>
              <Link className='text-3xl font-bold font-heading' href='/'>
                <Image
                  width={50}
                  height={50}
                  className='h-auto w-8'
                  src={theme === "light" ? "/dark-logo.png" : "/light-logo.png"}
                  alt='logo'
                />
              </Link>
              {session && (
                <Link
                  className='hover:text-gray-900 dark:hover:text-gray-300 transition-all border border-gray-600 py-1.5 px-3 rounded-md text-sm flex items-center justify-center gap-2'
                  href='/blog/create'>
                  Create blog
                  <IoCreateOutline className='text-xl' />
                </Link>
              )}
            </div>

            <div className='items-center space-x-5 flex '>
              <ToggleMode />
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className='w-7 h-7 cursor-pointer'>
                    <AvatarImage
                      src={avatar || "https://github.com/shadcn.png"}
                    />
                    <AvatarFallback>User</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <UserMenu />
              </DropdownMenu>
            </div>
          </div>
        </nav>
      </section>
    </div>
  );
};

export default Header;
