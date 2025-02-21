import { redirect } from "next/navigation";
import { auth } from "@/auth";
import MyTasks from "@/components/my-tasks";
import TaskSelector from "@/components/task-selector";
import { ListType, UserProps } from "@/types";
import { getPlanned } from "@/app/_actions/tasks.action";
import { allLists } from "@/app/_actions/list.actions";
import ActionButtons from "@/components/actions-buttons";

const PlannedPage = async () => {
  const session = await auth();
  const user = session?.user as UserProps;

  if (!user) redirect("/sigin");

  const lists = (await allLists(user.id!)) as ListType[];
  const planned = await getPlanned(user?.id);
  return (
    <div>
      {planned.length > 0 && (
        <div className="flex items-center gap-2">
          <TaskSelector tasks={planned} />
          <ActionButtons />
        </div>
      )}
      <MyTasks data={planned} lists={lists} />
    </div>
  );
};

export default PlannedPage;
