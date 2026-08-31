"use client";

import Link from "next/link";
import { List, MoreVertical } from "lucide-react";

import UpdateList from "@/components/update-list";
import DeleteList from "@/components/delete-list";
import { ListCardProps } from "@/types";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/useSidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const ListCard = ({ list, isChecked }: ListCardProps) => {
  const sidebar = useSidebar();
  return (
    <div
      key={list.id}
      className={cn(
        "group border rounded-2xl px-2 py-2 flex items-center w-full",
        list.color
          ? ""
          : "bg-gray-400/20 hover:bg-gray-400/10 transition-colors",
      )}
      style={{ background: list.color }}
    >
      <Link
        href={`/list/${list.id}`}
        className={cn(
          "flex items-center gap-1 w-full",
          list.color === "#ffffff" && "text-black",
        )}
        onClick={sidebar.onClose}
      >
        <div>{list.icon ? list.icon : <List size={14} />}</div>
        <p
          className={cn(
            list.color === "#ffffff" && "text-black",
            "w-32 whitespace-nowrap overflow-x-scroll",
          )}
        >
          {list.name}
        </p>
      </Link>
      {!isChecked && (
        <div className="flex gap-2 sm:opacity-0 sm:group-hover:opacity-100">
          <UpdateList list={list} />
          <DeleteList
            listId={list.id}
            listName={list.name}
            listColor={list.color}
          />
        </div>
      )}
    </div>
  );
};

export default ListCard;
