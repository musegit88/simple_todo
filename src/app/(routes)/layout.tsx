import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import TaskForm from "@/components/forms/task-form";
import { ModeToggle } from "@/components/mode-toggle";
import UserButton from "@/components/user-button";
import MobileNavigation from "@/components/mobile/mobile-navigation";
import MobileCreateTask from "@/components/mobile/mobile-create-task";
import { ListType, UserProps } from "@/types";
import { allLists } from "../_actions/list.actions";
import { allCounts } from "../_actions/tasks.action";

export default async function RoutesLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  const user = session?.user as UserProps;
  if (!user) {
    redirect("/signin");
  }

  const counts = await allCounts(user.id);
  const lists = (await allLists(user.id)) as ListType[];

  return (
    <div className="flex items-center">
      <div className="flex flex-col h-screen">
        <div className="hidden md:block md:w-72 wrapper">
          <div className="flex items-center justify-between">
            <div className="px-4 py-2">
              <UserButton user={user} />
            </div>
            <ModeToggle />
          </div>
        </div>
        <Sidebar counts={counts} lists={lists} userId={user.id} />
      </div>
      <div className="relative flex flex-col w-full h-screen">
        <Navbar counts={counts} user={user} lists={lists} />
        <main className="flex-1 p-2 md:p-4 wrapper rounded-md overflow-y-auto">
          {children}
        </main>
        <div className="hidden md:block">
          <TaskForm user={user} />
        </div>
        <MobileNavigation counts={counts} />
        <MobileCreateTask userId={user.id} />
      </div>
    </div>
  );
}
