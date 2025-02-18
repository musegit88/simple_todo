"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ChevronDown, ChevronRight, List } from "lucide-react";

import { cn } from "@/lib/utils";
import CreateList from "@/components/create-list";
import { Button } from "@/components/ui/button";
import ListCard from "@/components/list-card";
import DeleteLists from "@/components/delete-lists";
import { Checkbox } from "@/components/ui/checkbox";
import { ListProps } from "@/types";

const Lists = ({ lists, userId }: ListProps) => {
  const [show, setShow] = useState(true);
  const [listsIds, setListsIds] = useState<string[]>([]);

  useEffect(() => {
    if (listsIds.length === 1) {
      toast.info("Please select another list");
    }
  }, [listsIds.length]);
  const handleListsIds = (checked: boolean | string, listId: string) => {
    if (checked) {
      setListsIds((current) => [...current, listId]);
    }
    if (!checked) {
      const newListsIds = listsIds.filter((l) => l !== listId);
      setListsIds(newListsIds);
    }
  };
  return (
    <div className={cn("mt-6 overflow-hidden", show && "h-full")}>
      <div className="flex flex-col gap-4 h-full">
        <div className="flex flex-col gap-2">
          <div className="group flex items-center justify-between">
            <div className="flex items-center gap-2">
              <List size={18} />
              <div className="flex items-center gap-x-2">
                <h1>Lists</h1>
                <p className="counter_badge">{lists.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-x-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100">
              <Button
                onClick={() => setShow((prev) => !prev)}
                size="sm"
                variant="ghost"
              >
                {show ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </Button>

              <CreateList userId={userId} />
            </div>
          </div>
          {listsIds.length > 1 && show && (
            <DeleteLists listsIds={listsIds} setListsIds={setListsIds} />
          )}
        </div>
        {show && (
          <>
            <div className="flex flex-col space-y-4 overflow-y-auto">
              {lists.map((list) => (
                <div key={list.id} className="flex items-center gap-2 ">
                  {lists.length > 1 && (
                    <Checkbox
                      checked={listsIds.includes(list.id)}
                      onCheckedChange={(checked) =>
                        handleListsIds(checked, list.id)
                      }
                    />
                  )}
                  <ListCard
                    list={list}
                    isChecked={listsIds.includes(list.id)}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Lists;
