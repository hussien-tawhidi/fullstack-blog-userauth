"use client";
import BlogCard from "@/components/BlogCard";
import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiAuth0 } from "react-icons/si";
import { TbBrandMongodb, TbBrandNextjs } from "react-icons/tb";
import Loader from "../components/loader/loader";
import { format } from "date-fns";
interface props {
  [x: string]: string | number | Date;
  _id: string;
  title: string;
  description: string;
}

export default function Home() {
  const [post, setPost] = useState<props[]>([]);
  const [loading, setLoading] = useState(false);
  const posts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:3000/api/blog");

      if (data.data) {
        const formattedPosts = data.data.map(
          (post: { date: string | number | Date }) => ({
            ...post,
            date: format(new Date(post.date), "dd MMMM yyyy HH:mm"),
          })
        );
        setPost(formattedPosts);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    posts();
  }, []);
  // console.log(post[0]?.likedBy?.length);

  return (
    <main className='overflow-hidden'>
      <section className='lg:text-[3rem] my-3 mx-auto text-[1.8rem] flex items-center justify-center flex-col gap-2'>
        <h1 className=''>Let's make multi functional with</h1>
        <p className='text-[16px] tracking-tight font-light text-muted-foreground lg:w-[40vw] md:w-[60vw] w-[70vw] text-center'>
          The owner of every post could UPDATE DELETE his/her posts. you also by
          login/register could create post and have full-control on that
        </p>
        <div className='flex gap-3'>
          <TbBrandNextjs />
          <TbBrandMongodb />
          <RiTailwindCssFill />
          <SiAuth0 />
        </div>
      </section>
      {loading ? (
        <Loader />
      ) : // <Loader />
      post?.length <= 0 ? (
        <h1>There is not blog post yet</h1>
      ) : (
        <Suspense>
          <section className='grid md:grid-cols-3 max-w-[1280px] w-[90vw] mx-auto grid-cols-1 gap-3 md:gap-4'>
            {post.length > 0 &&
              post
                ?.sort()
                .map((post) => (
                  <BlogCard
                    authorName={post.username}
                    role={post.role}
                    avatar={post.avatar}
                    key={post._id}
                    title={post.title}
                    id={post?._id}
                    description={post.description}
                    date={post.date}
                    image={post.image}
                    hashtags={post.hashtags}
                  />
                ))}
          </section>
        </Suspense>
      )}
    </main>
  );
}
