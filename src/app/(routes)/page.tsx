import { redirect } from "next/navigation";
import { auth } from "@/auth";

import CompletedTasks from "@/components/completed-task";
import MyTasks from "@/components/my-tasks";
import TaskSelector from "@/components/task-selector";
import ActionButtons from "@/components/actions-buttons";
import { ListType, UserProps } from "@/types";
import { getCompletedTasks, getTasks } from "../_actions/tasks.action";
import { allLists } from "../_actions/list.actions";

const HomePage = async () => {
  const session = await auth();
  const user = session?.user as UserProps;

  if (!user) redirect("/sigin");

  const tasks = await getTasks(user?.id);
  const lists = (await allLists(user.id!)) as ListType[];
  const completedTasks = await getCompletedTasks(user?.id);
  const isCompleted = completedTasks.length > 0;

  return (
    <div className="overflow-hidden">
      {tasks.length > 0 && (
        <div className="flex items-center gap-2">
          <TaskSelector tasks={tasks} />
          <ActionButtons />
        </div>
      )}
      <MyTasks data={tasks} isCompleted={isCompleted} lists={lists} />
      {completedTasks.length > 0 && (
        <CompletedTasks completedTasks={completedTasks} lists={lists} />
      )}
    </div>
  );
};

export default HomePage;
