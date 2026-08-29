import { redirect } from "next/navigation";
import { auth } from "@/auth";
import MyTasks from "@/components/my-tasks";
import TaskSelector from "@/components/task-selector";
import { ListType, UserProps } from "@/types";
import { allLists } from "@/app/_actions/list.actions";
import { getSearchedTask } from "@/app/_actions/tasks.action";
import ActionButtons from "@/components/actions-buttons";

type SearchParams = Promise<{ query: string }>;

const SearchPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const session = await auth();
  const user = session?.user as UserProps;

  if (!user) redirect("/sigin");

  const lists = (await allLists(user.id!)) as ListType[];

  const { query } = await searchParams;

  if (!query) {
    redirect("/");
  }
  const searchTerm = query;
  const tasks = await getSearchedTask(searchTerm, user?.id);
  return (
    <div>
      {tasks.length > 0 && (
        <div className="flex items-center gap-2">
          <TaskSelector tasks={tasks} />
          <ActionButtons />
        </div>
      )}
      <MyTasks data={tasks} characters={searchTerm} lists={lists} />
    </div>
  );
};

export default SearchPage;
