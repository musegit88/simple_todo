import { redirect } from "next/navigation";
import { auth } from "@/auth";
import MyTasks from "@/components/my-tasks";
import TaskSelector from "@/components/task-selector";
import ActionButtons from "@/components/actions-buttons";
import { ListType, UserProps } from "@/types";
import { getMyDay } from "@/app/_actions/tasks.action";
import { allLists } from "@/app/_actions/list.actions";

const MyDayPage = async () => {
  const session = await auth();
  const user = session?.user as UserProps;

  if (!user) redirect("/sigin");

  const lists = (await allLists(user.id!)) as ListType[];
  const myDay = await getMyDay(user?.id);
  return (
    <div>
      {myDay.length > 0 && (
        <div className="flex items-center gap-2">
          <TaskSelector tasks={myDay} />
          <ActionButtons />
        </div>
      )}
      <MyTasks data={myDay} lists={lists} />
    </div>
  );
};

export default MyDayPage;
