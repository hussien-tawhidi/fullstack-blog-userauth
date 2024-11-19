"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import SocialAuthButtons from "./SocialAuthButtons";
import CreateUserForm from "./CreateUserForm";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const CreateUser = ({ session }: any) => {
  const params = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsloading] = useState(false);

  let callbackUrl = params.get("callbackUrl") || "/";
  const {
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { name, email, password } = form;
    setIsloading(true);
    try {
      const res = await fetch("/api/user/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (res.ok) {
        return router.push("/signin");
      } else {
        const data = await res.json();
        throw new Error(data.message);
      }
    } catch (err: any) {
      const error =
        err.message && err.message.indexOf("E11000") === 0
          ? "Email is duplicate"
          : err.message;
      toast.error(error || "error");
    } finally {
      setIsloading(false);
    }
  };
  return (
    <div className='max-w-sm mx-auto my-4 shadow-md lg:p-10 mt-10 p-5 rounded-md'>
      <div className='card-body'>
        <div className='md:my-5 my-3 '>
          <h1 className='card-title text-3xl text-center font-bold flex items-center justify-center md:gap-3 gap-2'>
            Create your account
          </h1>
          <p className='text-muted-foreground text-[12px] text-center w-[90%] mx-auto'>
            Welcome make an account for full access
          </p>
        </div>
        <CreateUserForm onSubmit={formSubmit} isLoading={isLoading} />
        <div className='divider'></div>
        <div className='text-[14px]'>
          <span className='text-muted-foreground font-light'>
            {" "}
            Already have an account?{" "}
          </span>
          <Link
            className='ml-1 font-semibold transition-all hover:text-blue-500'
            href={`/signin?callbackUrl=${callbackUrl}`}>
            Login
          </Link>
        </div>
        <SocialAuthButtons />
      </div>
    </div>
  );
};

export default CreateUser;
