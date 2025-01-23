import { auth } from "../../../auth";
import MyTasks from "@/components/my-tasks";
import { ListType, UserProps } from "@/types";
import { getMyDay } from "@/app/_actions/tasks.action";
import { allLists } from "@/app/_actions/list.actions";

const MyDayPage = async () => {
  const session = await auth();
  const user = session?.user as UserProps;
  const lists = (await allLists(user.id!)) as ListType[];
  const myDay = await getMyDay(user?.id);
  return (
    <div>
      <MyTasks data={myDay} lists={lists} />
    </div>
  );
};

export default MyDayPage;
