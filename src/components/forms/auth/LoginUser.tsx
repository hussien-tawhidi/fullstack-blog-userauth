import { Button } from "@/components/ui/button";
import SocialAuthButtons from "./SocialAuthButtons";
import LoadingButton from "../LoadingButton";
import Link from "next/link";

interface props {
  handleSubmit: (e: any) => void;
  handleUsernameChange: (e: any) => void;
  handlePasswordChange: (e: any) => void;
  email: string;
  password: string;
  isLoading: boolean;
}

const LoginUser = ({
  handleSubmit,
  email,
  password,
  handleUsernameChange,
  handlePasswordChange,
  isLoading,
}: props) => {
  return (
    <div className='h-screen flex flex-col items-center justify-center w-full'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col items-center justify-center max-w-[50vw] mx-auto gap-3 shadow-2xl rounded-md p-10'>
        <h6 className='text-xl font-semibold text-gray-600 dark:text-gray-200'>
          Login
        </h6>
        <label>
          Username
          <input
            className="className='shadow-gray-300 dark:shadow-gray-700 shadow-md w-full max-w-sm bg-transparent placeholder:text-[12px] p-3 focus:border-none'"
            type='text'
            name='email'
            value={email}
            onChange={handleUsernameChange}
          />
        </label>
        <label>
          Password
          <input
            type='password'
            name='password'
            value={password}
            onChange={handlePasswordChange}
            className="className='shadow-gray-300 dark:shadow-gray-700 shadow-md w-full max-w-sm bg-transparent placeholder:text-[12px] p-3 focus:border-none'"
          />
        </label>
        <Button
          type='submit'
          disabled={isLoading}
          variant='outline'
          className='w-full'>
          {isLoading ? <LoadingButton /> : "Sign in"}
        </Button>
        <div className='text-[14px]'>
          <span className='text-muted-foreground font-light'>
            {" "}
            Or you can create new?{" "}
          </span>
          <Link
            className='ml-1 font-semibold transition-all hover:text-blue-500'
            href={`/register`}>
            Create
          </Link>
        </div>
        <SocialAuthButtons />
      </form>
    </div>
  );
};

export default LoginUser;
