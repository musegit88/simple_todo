"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CheckCircle2, List } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CreateList from "@/components/create-list";
import { AddToListProps } from "@/types";
import {
  addTaskToList,
  getListNameById,
  removeTaskFromList,
} from "@/app/_actions/list.actions";

const SelectList = ({ lists, task }: AddToListProps) => {
  const router = useRouter();

  const taskId = task.id;
  const toggleTaskInList = async (listId: string) => {
    const listName = await getListNameById(listId);
    if (listId === task.listId) {
      await removeTaskFromList(task.userId, task.id);
      router.refresh();
      toast.success(`task removed to ${listName?.name}`);
    } else {
      await addTaskToList(taskId, listId, task.userId);
      router.refresh();
      toast.success(`task added to ${listName?.name}`);
    }
  };

  return (
    <div className="flex items-center" title="Select list">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="cursor-pointer">
            <List size={18} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Select List</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {lists && lists.length > 0 ? (
              <>
                {lists?.map((list) => (
                  <DropdownMenuItem
                    key={list.id}
                    onClick={() => toggleTaskInList(list.id)}
                    className="flex items-center justify-between"
                  >
                    <p>{list.name}</p>
                    {list.id === task.listId && (
                      <CheckCircle2 size={14} color="green" />
                    )}
                  </DropdownMenuItem>
                ))}
              </>
            ) : (
              <div className="flex items-center justify-center">
                <CreateList userId={task.userId} />
              </div>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SelectList;
