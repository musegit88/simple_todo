import { getCompletedTasks } from "@/app/_actions/tasks.action";
import MyTasks from "@/components/my-tasks";
import { ListType, UserProps } from "@/types";
import { auth } from "../../../auth";
import { allLists } from "@/app/_actions/list.actions";

const PlannedPage = async () => {
  const session = await auth();
  const user = session?.user as UserProps;
  const lists = (await allLists(user.id!)) as ListType[];
  const completed = await getCompletedTasks(user?.id);
  return (
    <div>
      <MyTasks data={completed} lists={lists} />
    </div>
  );
};

export default PlannedPage;
