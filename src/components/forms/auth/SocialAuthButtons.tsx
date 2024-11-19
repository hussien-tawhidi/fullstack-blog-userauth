"use client"

import { loginWithGithub, loginWithGoogle } from "@/actions/socialLogin";
import { Button } from "@/components/ui/button";
import { FaGoogle, FaGithub } from "react-icons/fa";


export default function SocialAuthButtons() {
  return (
    <div className='my-5 text-center'>
      <p className='text-muted-foreground'>Or Continue with</p>
      <div className='flex gap-2'>
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
    </div>
  );
}
