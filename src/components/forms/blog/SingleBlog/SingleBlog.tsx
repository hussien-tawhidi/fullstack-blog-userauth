import BlogHeader from "./BlogHeader";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import Description from "./Description";
import BlogHashtags from "./BlogHastags";
import BlogAction from "./BlogAction";

interface singleBlogProps {
  image: string;
  title: string;
  authorName: string;
  description: string;
  hashtags: string[];
  postDate: Date | any;
  avatar: string;
  blogId: string;
  likedBy: string;
  postCreatorId?: boolean;
  isLiked: boolean;
  setIsLiked: (e: any) => void;
  initialData: any;
}

const SingleBlog = ({
  image,
  title,
  authorName,
  description,
  hashtags,
  postDate,
  avatar,
  blogId,
  likedBy,
  postCreatorId,
  isLiked,
  setIsLiked,
  initialData,
}: singleBlogProps) => {
  return (
    <div className='max-w-screen-xl mx-auto relative mt-10 overflow-hidden'>
      {postCreatorId && (
        <BlogAction blogId={blogId} initialData={initialData} />
      )}
      <main className='mt-10'>
        <BlogHeader
          image={image}
          title={title}
          avatar={avatar}
          authorName={authorName}
          postDate={postDate}
        />
        <Description description={description} />
        <BlogHashtags hashtags={hashtags} />
        <LikeButton
          blogId={blogId}
          likedBy={likedBy}
          isLiked={isLiked}
          setIsLiked={setIsLiked}
        />
        <Comments blogId={blogId} />
      </main>
    </div>
  );
};

export default SingleBlog;
