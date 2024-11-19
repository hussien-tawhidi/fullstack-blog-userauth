import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { CiBookmark, CiClock2 } from "react-icons/ci";
import UserAvatar from "./UserAvatar";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  title: string;
  description: string;
  date: string | number | Date;
  id: string;
  authorName: any | string;
  role: string | any;
  avatar?: string | number | Date;
  image?: any | string;
  hashtags?: string[] | any;
}

const BlogCard = ({
  title,
  description,
  date,
  id,
  role,
  authorName,
  avatar,
  image,
  hashtags,
}: Props) => {
  const router = useRouter();

  return (
    <div
      className='flex flex-col justify-center relative sm:py-12 cursor-pointer'
      onClick={() => router.push(`/blog/${id}`)}>
      <div className='w-full mx-auto'>
        <div className='relative group'>
          <span className='absolute bg-gray-300/75 text-gray-900 top-0 left-0 z-50'>
            <div className='flex items-center gap-1 text-[10px] opacity-65 p-3'>
              <CiClock2 /> {formatDistanceToNow(date)}
            </div>
          </span>
          <div className='absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200'></div>
          <div className='relative px-7 py-6 bg-white dark:bg-black ring-1 ring-gray-900/5 dark:ring-gray-900/45 rounded-lg leading-none flex flex-col items-top justify-start pb-[3rem]'>
            <Image
              src={image || "/images/defualta.jpg"}
              width={400}
              height={400}
              className='object-cover rounded-lg w-full h-[250px] overflow-hidden'
              alt='blog image'
            />
            <div className='space-y-2 w-full mt-5'>
              <h2 className='font-semibold flex items-center md:text-2xl text-xl gap-3'>
                {/* <CiBookmark className='text-5xl' /> */}
                {title}
              </h2>
              <p className='text-slate-800 dark:text-slate-100 border-b pb-3'>
                {description.length > 100 ? (
                  <>
                    <Link
                      href={`/blog/${id}`}
                      className='leading-5 text-muted-foreground md:text-[14px] text-[12px]'>
                      {description.slice(0, 300)}
                      <span className='ml-1 text-[14px] text-purple-600'>
                        more ...
                      </span>
                    </Link>
                  </>
                ) : (
                  description
                )}
              </p>
              {hashtags && (
                <p className='mt-5 pt-5 flex gap-2 font-semibold text-sm text-muted-foreground'>
                  {hashtags.map((hashtag: any) => (
                    <span key={hashtag}>#{hashtag}</span>
                  ))}
                </p>
              )}
              <Link
                href={`/user`}
                className='flex justify-end gap-2 text-[7px] items-end absolute bottom-2 p-2 rounded-md cursor-pointer right-2 transition-all hover:border'>
                <UserAvatar avatar={avatar} />
                <div className='flex flex-col gap-1'>
                  <p className='font-semibold'>{authorName}</p>
                  <p className='opacity-70'>Role | {role}</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
