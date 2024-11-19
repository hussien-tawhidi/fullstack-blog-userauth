
interface Comment {
  userId: string;
  username: string;
  avatar?: string;
  comment: string;
  date: string;
}

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  if (comments.length === 0) {
    return (
      <p className='text-gray-500'>No comments yet. Be the first to comment!</p>
    );
  }

  return (
    <ul className='space-y-4'>
      {comments.map((comment) => (
        <li
          key={comment.userId + comment.date}
          className='p-4 border rounded-lg shadow-sm'>
          <div className='flex items-center space-x-4 mb-2'>
            <img
              src={comment.avatar || "/default-avatar.png"}
              alt='User Avatar'
              className='w-10 h-10 rounded-full'
            />
            <div>
              <p className='font-semibold'>{comment.username}</p>
              <p className='text-sm text-gray-500'>
                {new Date(comment.date).toLocaleString()}
              </p>
            </div>
          </div>
          <p className='text-gray-700'>{comment.comment}</p>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
