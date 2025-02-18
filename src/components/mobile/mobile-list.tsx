"use client";

import { useState } from "react";

import CreateList from "@/components/create-list";
import ListCard from "@/components/list-card";
import { handleListsIds } from "@/lib/utils";
import { MobileListProps } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import DeleteLists from "../delete-lists";

const MobileLists = ({ lists, userId }: MobileListProps) => {
  const [listsIds, setListsIds] = useState<string[]>([]);

  return (
    <div className="md:hidden w-full h-72 overflow-hidden">
      <div className="flex flex-col gap-4 h-full">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <h1>Lists</h1>
              <p className="counter_badge">{lists.length}</p>
            </div>
            <CreateList userId={userId} />
          </div>
          {listsIds.length > 1 && (
            <DeleteLists listsIds={listsIds} setListsIds={setListsIds} />
          )}
        </div>
        <div className="flex flex-col space-y-4 overflow-y-auto">
          {lists.map((list) => (
            <div key={list.id} className="flex items-center gap-2 ">
              {lists.length > 1 && (
                <Checkbox
                  checked={listsIds.includes(list.id)}
                  onCheckedChange={(checked) =>
                    handleListsIds(checked, list.id, listsIds, setListsIds)
                  }
                />
              )}
              <ListCard list={list} isChecked={listsIds.includes(list.id)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileLists;
