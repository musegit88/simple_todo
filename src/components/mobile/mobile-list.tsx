"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import CreateList from "@/components/create-list";
import ListCard from "@/components/list-card";
import { handleListsIds } from "@/lib/utils";
import { MobileListProps } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import DeleteLists from "@/components/delete-lists";

const MobileLists = ({ lists, userId }: MobileListProps) => {
  const [listIds, setListIds] = useState<string[]>([]);

  return (
    <div className="md:hidden w-full h-72 overflow-hidden">
      <div className="flex flex-col gap-4 h-full">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              {lists.length > 1 && (
                <Checkbox
                  checked={listIds.length === lists.length}
                  onCheckedChange={(checked) =>
                    checked
                      ? setListIds(lists.map((list) => list.id))
                      : setListIds([])
                  }
                />
              )}
              <h1>Lists</h1>
              <p className="counter_badge">{lists.length}</p>
            </div>
            <CreateList userId={userId} />
          </div>
          {listIds.length > 1 && (
            <>
              <DeleteLists listsIds={listIds} setListIds={setListIds} />
              <Button variant="outline" onClick={() => setListIds([])}>
                Cancle
              </Button>
            </>
          )}
        </div>
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
      </div>
    </div>
  );
};

export default MobileLists;
