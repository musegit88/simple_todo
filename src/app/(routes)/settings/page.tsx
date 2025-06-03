import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { UserProps } from "@/types";
import UserInfo from "./_components/user-info";

const ProfilePage = async () => {
  const session = await auth();
  const user = session?.user as UserProps;
  if (!user) redirect("/sigin");

  return (
    <div>
      <UserInfo user={user} />
    </div>
  );
};

export default ProfilePage;
