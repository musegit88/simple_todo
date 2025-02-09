import Link from "next/link";
import { List } from "lucide-react";

import UpdateList from "@/components/update-list";
import DeleteList from "@/components/delete-list";
import { ListCardProps } from "@/types";
import { cn } from "@/lib/utils";

const ListCard = ({ list }: ListCardProps) => {
  return (
    <div
      key={list.id}
      className={cn(
        "group border rounded-md px-2 py-2 flex items-center",
        list.color
          ? ""
          : "bg-gray-400/20 hover:bg-gray-400/10 transition-colors"
      )}
      style={{ background: list.color }}
    >
      <Link
        href={`/list/${list.id}`}
        className={cn(
          "flex items-center gap-1 w-full",
          list.color === "#ffffff" && "text-black"
        )}
      >
        <div>{list.icon ? list.icon : <List size={14} />}</div>
        <p className={cn(list.color === "#ffffff" && "text-black")}>
          {list.name}
        </p>
        {list._count.tasks > 0 && (
          <p className={cn("counter_badge", list.color && "border")}>
            {list._count.tasks}
          </p>
        )}
      </Link>
      <div className="flex gap-2 sm:opacity-0 sm:group-hover:opacity-100">
        <UpdateList list={list} />
        <DeleteList
          listId={list.id}
          listName={list.name}
          listColor={list.color}
        />
      </div>
    </div>
  );
};

export default ListCard;
