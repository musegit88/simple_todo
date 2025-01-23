import { allLists, getListById } from "@/app/_actions/list.actions";
import { auth } from "../../../../auth";
import Empty from "@/components/empty";
import MyTasks from "@/components/my-tasks";
import { redirect } from "next/navigation";
import { ListType } from "@/types";

const ListPage = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  const userId = session?.user?.id;
  const { id } = params;
  const singleList = await getListById(id, userId!);
  if (singleList === null) redirect("/");
  const lists = (await allLists(userId!)) as ListType[];
  return (
    <div className="overflow-hidden">
      {singleList?.tasks.length ? (
        <MyTasks data={singleList.tasks} lists={lists} />
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default ListPage;
