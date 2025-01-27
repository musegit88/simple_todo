import { redirect } from "next/navigation";
import { auth } from "@/auth";
import MyTasks from "@/components/my-tasks";
import { ListType, UserProps } from "@/types";
import { getCompletedTasks } from "@/app/_actions/tasks.action";
import { allLists } from "@/app/_actions/list.actions";

const PlannedPage = async () => {
  const session = await auth();
  const user = session?.user as UserProps;

  if (!user) redirect("/sigin");

  const lists = (await allLists(user.id!)) as ListType[];
  const completed = await getCompletedTasks(user?.id);
  return (
    <div>
      <MyTasks data={completed} lists={lists} />
    </div>
  );
};

export default PlannedPage;
