"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ChevronDown, ChevronRight, List } from "lucide-react";

import { cn, handleListsIds } from "@/lib/utils";
import CreateList from "@/components/create-list";
import { Button } from "@/components/ui/button";
import ListCard from "@/components/list-card";
import DeleteLists from "@/components/delete-lists";
import { Checkbox } from "@/components/ui/checkbox";
import { ListProps } from "@/types";

const Lists = ({ lists, userId }: ListProps) => {
  const [show, setShow] = useState(true);
  const [listIds, setListIds] = useState<string[]>([]);

  useEffect(() => {
    if (listIds.length === 1) {
      toast.info("Please select another list");
    }
  }, [listIds.length]);

  return (
    <div className={cn("mt-6 overflow-hidden", show && "h-full")}>
      <div className="flex flex-col gap-4 h-full">
        <div className="flex flex-col gap-2">
          <div className="group flex items-center justify-between">
            <div className="flex items-center gap-2">
              {lists.length > 1 && (
                <Checkbox
                  title="select all"
                  checked={listIds.length === lists.length}
                  onCheckedChange={(checked) =>
                    checked
                      ? setListIds(lists.map((list) => list.id))
                      : setListIds([])
                  }
                />
              )}
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
          {listIds.length > 1 && show && (
            <div className="flex gap-2 w-full">
              <DeleteLists listsIds={listIds} setListIds={setListIds} />
              <Button
                variant="outline"
                onClick={() => setListIds([])}
                className="w-full py-4"
              >
                Cancle
              </Button>
            </div>
          )}
        </div>
        {show && (
          <>
            <div className="flex flex-col space-y-4 overflow-y-auto">
              {lists.map((list) => (
                <div key={list.id} className="flex items-center gap-2 ">
                  {lists.length > 1 && (
                    <Checkbox
                      checked={listIds.includes(list.id)}
                      onCheckedChange={(checked) =>
                        handleListsIds(checked, list.id, listIds, setListIds)
                      }
                    />
                  )}
                  <ListCard list={list} isChecked={listIds.includes(list.id)} />
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
