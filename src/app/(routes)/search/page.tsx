import { redirect } from "next/navigation";

import { getSearchedTask } from "@/app/_actions/tasks.action";
import MyTasks from "@/components/my-tasks";
import { ListType, UserProps } from "@/types";
import { auth } from "../../../auth";
import { allLists } from "@/app/_actions/list.actions";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { query: string };
}) => {
  const session = await auth();
  const user = session?.user as UserProps;
  const lists = (await allLists(user.id!)) as ListType[];

  if (!searchParams.query) {
    redirect("/");
  }
  const searchTerm = searchParams?.query;
  const tasks = await getSearchedTask(searchTerm, user?.id);
  return (
    <div>
      <MyTasks data={tasks} characters={searchTerm} lists={lists} />
    </div>
  );
};

export default SearchPage;
