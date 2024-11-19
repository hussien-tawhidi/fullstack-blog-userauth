import React from "react";

interface ProfileStatsProps {
  postsCount: number;
  friendsCount: number;
  reactionsCount: number;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({
  postsCount,
  friendsCount,
  reactionsCount,
}) => {
  return (
    <div className='grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0'>
      <div>
        <p className='font-bold text-gray-700 dark:text-gray-300 text-xl'>
          {friendsCount}
        </p>
        <p className='text-gray-600 dark:text-gray-300'>Friends</p>
      </div>
      <div>
        <p className='font-bold text-gray-700 dark:text-gray-300 text-xl'>
          {postsCount}
        </p>
        <p className='text-gray-600 dark:text-gray-300'>Posts</p>
      </div>
      <div>
        <p className='font-bold text-gray-600 dark:text-gray-300 text-xl'>
          {reactionsCount}
        </p>
        <p className='text-gray-600 dark:text-gray-300'>Total Reaction</p>
      </div>
    </div>
  );
};

export default ProfileStats;
