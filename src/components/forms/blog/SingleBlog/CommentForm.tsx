"use client";

import { Button } from "@/components/ui/button";
import LoadingButton from "../../LoadingButton";
import { useSession } from "next-auth/react";
import SocialAuthButtons from "../../auth/SocialAuthButtons";
import { useRouter } from "next/navigation";

interface CommentFormProps {
  newComment: string;
  setNewComment: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  error: string;
}

const CommentForm: React.FC<CommentFormProps> = ({
  newComment,
  setNewComment,
  handleSubmit,
  loading,
  error,
}) => {
  const router = useRouter();

  const { data: session } = useSession();
  return (
    <form onSubmit={handleSubmit} className='mb-6 mx-4'>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder={
          !session
            ? "Please login then write a comment..."
            : "Write your comment..."
        }
        className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          !session && "placeholder:text-red-500"
        }`}
        rows={3}
        disabled={loading || !session}></textarea>
      {!session && (
        <div className=''>
          <div className='flex md:gap-5 gap-2'>
            <Button
              className='w-full'
              variant='outline'
              onClick={() => router.push("/signin")}>
              Login
            </Button>
            <Button
              className='w-full'
              variant='outline'
              onClick={() => router.push("/register")}>
              Create an account
            </Button>
          </div>
          <SocialAuthButtons />
        </div>
      )}
      {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
      <Button
        type='submit'
        variant='outline'
        disabled={loading}
        className={`${!session && "hidden"}`}>
        {loading ? <LoadingButton /> : "Post Comment"}
      </Button>
    </form>
  );
};

export default CommentForm;
