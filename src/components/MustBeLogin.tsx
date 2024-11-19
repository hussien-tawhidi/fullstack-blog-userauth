"use client";

import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import SocialAuthButtons from "./forms/auth/SocialAuthButtons";
import { AlertOctagonIcon } from "lucide-react";

interface Props {
  title: string;
  description: string;
}

const MustBeLogin = ({ title, description }: Props) => {
  return (
    <div className='h-screen overflow-hidden flex items-center justify-center'>
      <div className='w-[90vw] mx-auto flex justify-center'>
        <div className='py-10 dark:bg-dark'>
          <div className='container'>
            <div className='flex w-full rounded-lg border-l-[6px] border-red bg-red-light-6 px-7 py-8 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.08)] md:p-9'>
              <div className='mr-5 flex h-[34px] w-full max-w-[34px] items-center justify-center rounded-lg bg-red'>
                <AlertOctagonIcon className='text-[#BC1C21]' />
              </div>
              <div className='w-full'>
                <h5 className='mb-3 text-base font-semibold text-[#BC1C21]'>
                  {title}
                </h5>
                <ul className=''>
                  <li className='text-base leading-relaxed text-red-light'>
                    {description}
                  </li>
                  <li className='flex gap-2 mb-10 mt-5'>
                    <Button variant='outline' className='w-full'>
                      <Link href='/signin'>SignIn</Link>
                    </Button>
                    <Button variant='outline' className='w-full'>
                      <Link href='/signin'>Create an account</Link>
                    </Button>
                  </li>
                  <li>
                    <SocialAuthButtons />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MustBeLogin;
