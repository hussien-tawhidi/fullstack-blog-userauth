"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileAvatar from "./ProfileAvatar";
import ProfileActions from "./ProfileActions";
import ProfileDetails from "./ProfileDetails";
import ProfileStats from "./ProfileState";

interface ProfileProps {
  email: string;
  name: string;
  isVerified: boolean;
  role: string;
  avatar: string;
}

const Profile: React.FC<ProfileProps> = ({
  email,
  name,
  isVerified,
  role,
  avatar,
}) => {
  const [postsCount, setPostsCount] = useState<number>(0);

  const getUserPost = async () => {
    try {
      const res = await axios.get("/api/user/user-posts");
      setPostsCount(res.data.data.length);
    } catch (error) {
      console.error("Failed to fetch user posts:", error);
    }
  };

  useEffect(() => {
    getUserPost();
  }, []);

  return (
    <div className='p-16'>
      <div className='p-8 shadow mt-24'>
        <div className='grid grid-cols-1 md:grid-cols-3'>
          <ProfileStats
            postsCount={postsCount}
            friendsCount={22}
            reactionsCount={89}
          />
          <ProfileAvatar avatar={avatar} isVerified={isVerified} />
          <ProfileActions />
        </div>
        <ProfileDetails name={name} age={27} email={email} role={role} />
      </div>
    </div>
  );
};

export default Profile;
