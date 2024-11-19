"use client";

import SingleBlog from "@/components/forms/blog/SingleBlog/SingleBlog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "../../../components/loader/loader";
const page = () => {
  const [blog, setBlog] = useState<any>();
  const [postCreator, setPostCreator] = useState(false);
  const { blogId } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { data: session, status } = useSession(); // Access session and status
  const userId = session?.user?._id; // Extract userId from session

  const getData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/blog");
      if (data.data) {
        const foundBlog = data.data.find((blog: any) => blog._id === blogId);
        if (foundBlog) {
          setBlog(foundBlog);

          // Check if the logged-in user is the creator of the post
          if (userId && userId === foundBlog?.userId) {
            setPostCreator(true);
          }

          // Check if the logged-in user has liked the post
          const isUserFound = foundBlog?.likedBy?.includes(userId);
          if (isUserFound) {
            setIsLiked(true);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching blog data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData(); // Fetch blog data regardless of authentication status
  }, [status]);

  return (
    <div className='relative'>
      {loading ? (
        <Loader />
      ) : (
        <>
          {blog ? (
            <SingleBlog
              initialData={blog}
              isLiked={isLiked}
              setIsLiked={setIsLiked}
              authorName={blog?.username}
              description={blog?.description}
              hashtags={blog?.hashtags}
              image={blog?.image}
              postDate={blog?.date && formatDistanceToNow(new Date(blog.date))}
              title={blog?.title}
              avatar={blog?.avatar}
              blogId={blog?._id}
              likedBy={blog?.likedBy?.length}
              postCreatorId={postCreator}
            />
          ) : (
            <div className='flex items-center justify-center h-[90vh] flex-col gap-5'>
              <h3>Opps this blog has deleted or missed</h3>
              <Button
                variant='outline'
                onClick={() => router.push("/blog/create")}>
                Create post
              </Button>
              <Button variant='outline' onClick={() => router.push("/")}>
                Home
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default page;
