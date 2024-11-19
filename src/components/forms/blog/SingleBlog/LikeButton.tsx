import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import { useSession } from "next-auth/react";
interface LikeButtonProps {
  blogId: string;
  likedBy?: string;
  userId?: string;
  isLiked: boolean;
  setIsLiked: (e: any) => void;
}

const LikeButton = ({
  blogId,
  likedBy,
  userId,
  isLiked,
  setIsLiked,
}: LikeButtonProps) => {
  const { data: session } = useSession();
  console.log(session);
  const handleLike = async () => {
    try {
      const response = await axios.post(`/api/blog/${blogId}/like`);
      if (response.status === 200) {
        const { likes } = response.data;
        toast.success("Blog liked successfully:", likes);
        if (response.data.likedBy === userId) {
          setIsLiked(true);
        }
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              toast.error("You have already liked this post!");
              break;
            case 404:
              toast.error("Blog post not found!");
              break;
            case 500:
              toast.error(
                "An unexpected server error occurred. Please try again later."
              );
              break;
            default:
              toast.error("An unknown error occurred.");
          }
        } else {
          toast.error("Network error. Please check your internet connection.");
        }
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className='flex items-center justify-between mt-4 w-full'>
      <button
        onClick={handleLike}
        disabled={isLiked || !session}
        className='flex gap-2 items-center border-t w-full pt-3 pl-3'>
        {isLiked ? <FaHeart className='text-red-500' /> : <CiHeart />}
        <span>{likedBy}</span>
      </button>
    </div>
  );
};

export default LikeButton;
