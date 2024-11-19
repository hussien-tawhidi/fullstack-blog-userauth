"use client";

import BlogCard from "@/components/BlogCard";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const UsersPosts = () => {
  const { data: session } = useSession();
  const [getData, setGetData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const userId = session?.user?._id;

  const posts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/user/user-posts");
      const postsArray = data.data;

      if (Array.isArray(postsArray)) {
        const isUserIsTheCreator = postsArray.some(
          (item: any) => item.userId === userId
        );

        if (isUserIsTheCreator) {
          setGetData(postsArray);
          return;
        }
      }

      setGetData([]);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setGetData([]); // Clear data on failure
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    posts();
  }, []);

  return (
    <div className='max-w-[90vw] mx-auto grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2'>
      {loading ? (
        "Please wait..."
      ) : (
        <div className=''>
          {getData.length > 0
            ? getData?.map((post: any) => (
                <BlogCard
                  key={post._id}
                  authorName={post.authorName}
                  date={post.date}
                  description={post.description}
                  id={post._id}
                  role={post.role}
                  title={post.title}
                  avatar={post.avatar}
                  image={post.image}
                />
              ))
            : ""}
        </div>
      )}
    </div>
  );
};

export default UsersPosts;
