"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, List } from "lucide-react";

import { cn } from "@/lib/utils";
import CreateList from "@/components/create-list";
import { Button } from "@/components/ui/button";
import ListCard from "@/components/list-card";
import { ListProps } from "@/types";

const Lists = ({ lists, userId }: ListProps) => {
  const [show, setShow] = useState(true);
  return (
    <div className={cn("mt-6 overflow-hidden", show && "h-full")}>
      <div className="flex flex-col gap-4 h-full">
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
        {show && (
          <div className="flex flex-col space-y-4 overflow-y-auto">
            {lists.map((list) => (
              <ListCard key={list.id} list={list} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Lists;
