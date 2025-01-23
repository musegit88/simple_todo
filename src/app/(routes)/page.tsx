import { getCompletedTasks, getTasks } from "../_actions/tasks.action";
import CompletedTasks from "@/components/completed-task";
import MyTasks from "@/components/my-tasks";
import { ListType, UserProps } from "@/types";
import { auth } from "@/auth";
import { allLists } from "../_actions/list.actions";

const HomePage = async () => {
  const session = await auth();
  const user = session?.user as UserProps;
  const tasks = await getTasks(user?.id);
  const lists = (await allLists(user.id!)) as ListType[];
  const completedTasks = await getCompletedTasks(user?.id);
  const isCompleted = completedTasks.length > 0;

  return (
    <div className="overflow-hidden">
      <MyTasks data={tasks} isCompleted={isCompleted} lists={lists} />
      {completedTasks.length > 0 && (
        <CompletedTasks completedTasks={completedTasks} lists={lists} />
      )}
    </div>
  );
};

export default HomePage;
