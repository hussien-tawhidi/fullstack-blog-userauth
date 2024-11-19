interface BlogHashtagsProps {
  hashtags: string[];
}

const BlogHashtags = ({ hashtags }: BlogHashtagsProps) => {
  return (
    <div className='mt-5 mb-3 px-3'>
      {hashtags && (
        <p className='font-semibold flex gap-2 text-sm'>
          {hashtags.map((hashtag) => (
            <span key={hashtag}>#{hashtag}</span>
          ))}
        </p>
      )}
    </div>
  );
};

export default BlogHashtags;
