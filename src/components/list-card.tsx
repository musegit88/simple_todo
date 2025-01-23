import Link from "next/link";
import { List } from "lucide-react";

import UpdateList from "@/components/update-list";
import DeleteList from "@/components/delete-list";
import { ListCardProps } from "@/types";

const ListCard = ({ list }: ListCardProps) => {
  return (
    <div
      key={list.id}
      className="group border rounded-md px-2 py-2 flex items-center bg-gray-400/20 hover:bg-gray-400/10 transition-colors"
    >
      <Link
        href={`/list/${list.id}`}
        className="flex items-center gap-1 w-full"
      >
        <div>{list.icon ? list.icon : <List size={14} />}</div>
        <p>{list.name}</p>
        {list._count.tasks > 0 && (
          <p className="counter_badge">{list._count.tasks}</p>
        )}
      </Link>
      <div className="flex gap-2 sm:opacity-0 sm:group-hover:opacity-100">
        <UpdateList list={list} />
        <DeleteList listId={list.id} listName={list.name} />
      </div>
    </div>
  );
};

export default ListCard;
