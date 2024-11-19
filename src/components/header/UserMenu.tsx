"use client";

import { Button } from "../ui/button";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { CiUser } from "react-icons/ci";
import {
  loginWithGithub,
  loginWithGoogle,
  logOut,
} from "@/actions/socialLogin";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { RiUserAddLine } from "react-icons/ri";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const UserMenu = () => {
  const { data: session, status } = useSession(); // Include `status` to track session state
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      // Redirect or refresh the menu to show login options
      router.push("/");
    }
  }, [status, router]);
  return (
    <>
      {session ? (
        <DropdownMenuContent className='w-[200px]'>
          <DropdownMenuLabel className='capitalize'>
            {session?.user?.name || ""}
          </DropdownMenuLabel>
          <DropdownMenuLabel className='text-[10px] text-muted-foreground'>
            {session?.user?.email?.slice(0, 20)}...
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={`/${session?.user?._id}`} className='px'>
              Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>Posts</DropdownMenuItem>
          <DropdownMenuItem>
            <Button
              className='flex items-center justify-center gap-2 w-full'
              variant='outline'
              onClick={async () => {
                await logOut();
                router.refresh();
              }}>
              <span>SignOut</span>
              <Image
                src='/icons/signOut.svg'
                alt='logout'
                width={20}
                height={20}
                className='cursor-pointer opacity-90 hover:opacity-100 transition'
              />
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent className='pt-10 w-[200px]'>
          <DropdownMenuItem>
            <Button variant='outline' className='w-full'>
              <Link href='/register' className='flex gap-2'>
                Create <RiUserAddLine />
              </Link>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button variant='outline' className='w-full'>
              <Link href='/signin' className='flex items-center gap-2'>
                Sign In <CiUser />
              </Link>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem className='flex flex-col mt-10'>
            <p className='text-[12px] text-muted-foreground'>
              Or continue with
            </p>
            <div className='flex gap-2 justify-between items-center w-full'>
              <Button
                className='w-full text-muted-foreground'
                variant='outline'
                onClick={loginWithGoogle}>
                <FaGoogle />
              </Button>
              <Button
                className='w-full text-muted-foreground'
                variant='outline'
                onClick={loginWithGithub}>
                <FaGithub />
              </Button>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </>
  );
};

export default UserMenu;
