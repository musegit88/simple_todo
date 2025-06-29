import { redirect } from "next/navigation";

import { auth } from "@/auth";
import Landing from "@/components/landing";
import { UserProps } from "@/types";

const LandingPage = async () => {
  const session = await auth();
  const user = session?.user as UserProps;
  if (user) {
    redirect("/home");
  }
  return <div>{!user && <Landing />}</div>;
};

export default LandingPage;
