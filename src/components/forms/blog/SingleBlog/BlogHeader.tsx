import Image from "next/image";

interface BlogHeaderProps {
  image: string;
  title: string;
  avatar: string;
  authorName: string;
  postDate: Date | any;
}

const BlogHeader = ({
  image,
  title,
  avatar,
  authorName,
  postDate,
}: BlogHeaderProps) => {
  return (
    <div className='mb-4 md:mb-0 w-full mx-auto relative text-gray-600 dark:text-gray-300'>
      {!image ? (
        <div className='flex items-center justify-center h-screen w-full'>
          <p>Loading...</p>
        </div>
      ) : (
        <Image
          src={image}
          alt='image'
          width={1000}
          height={500}
          className='rounded-md object-cover w-[60vw] h-auto'
        />
      )}
      <div>
        <h2 className='text-4xl font-semibold leading-tight'>{title}</h2>
        <div className='flex mt-3'>
          <Image
            alt={title || "image"}
            width={50}
            height={50}
            src={avatar || "https://randomuser.me/api/portraits/men/97.jpg"}
            className='h-10 w-10 rounded-full mr-2 object-cover'
          />
          <div>
            <p className='font-semibold text-sm'>{authorName}</p>
            <p className='font-semibold text-gray-400 text-xs'>{postDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHeader;
