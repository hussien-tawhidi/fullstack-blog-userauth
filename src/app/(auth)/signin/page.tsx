"use client";

import LoginUser from "@/components/forms/auth/LoginUser";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, FormEvent, ChangeEvent } from "react";
import toast from "react-hot-toast";

export default function SignIn() {
  const [email, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsloading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsloading(true);

    try {
      // Attempt to sign in with credentials
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        toast.error("email or password not valid");
      } else {
        toast.success("Successfully login ");
        router.refresh();
        router.push("/");
      }
    } catch (error: any) {
      console.error("Unexpected error:", error);
    } finally {
      setIsloading(false);
    }
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <LoginUser
      email={email}
      password={password}
      handlePasswordChange={handlePasswordChange}
      handleSubmit={handleSubmit}
      handleUsernameChange={handleUsernameChange}
      isLoading={isLoading}
    />
  );
}
