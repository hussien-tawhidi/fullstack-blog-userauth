import Profile from "@/components/forms/profile/Profile";
import { auth } from "../../../../auth";
import UsersPosts from "@/components/forms/profile/UsersPosts";
import { redirect } from "next/navigation";

const UserProfilePage = async () => {
  const session = await auth();

  if (!session) redirect("/signin");
  return (
    <div>
      <Profile
        email={session?.user.email}
        isVerified={session?.user.isVerified}
        name={session?.user.name}
        role={session?.user.role}
        avatar=''
      />
      <UsersPosts />
    </div>
  );
};

export default UserProfilePage;
