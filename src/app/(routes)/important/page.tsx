import { redirect } from "next/navigation";
import { auth } from "@/auth";
import MyTasks from "@/components/my-tasks";
import TaskSelector from "@/components/task-selector";
import ActionButtons from "@/components/actions-buttons";
import { ListType, UserProps } from "@/types";
import { getImportants } from "@/app/_actions/tasks.action";
import { allLists } from "@/app/_actions/list.actions";

const ImportantPage = async () => {
  const session = await auth();
  const user = session?.user as UserProps;

  if (!user) redirect("/sigin");

  const lists = (await allLists(user.id!)) as ListType[];
  const importants = await getImportants(user?.id);
  return (
    <div>
      {importants.length > 0 && (
        <div className="flex items-center gap-2">
          <TaskSelector tasks={importants} />
          <ActionButtons />
        </div>
      )}
      <MyTasks data={importants} lists={lists} />
    </div>
  );
};

export default ImportantPage;
