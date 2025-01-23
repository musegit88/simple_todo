"use client";

import { ElementRef, useEffect, useRef } from "react";

import Empty from "@/components/empty";
import { MyTasksProps } from "@/types";
import TaskCard from "@/components/task-card";

const MyTasks = ({ data, isCompleted, characters, lists }: MyTasksProps) => {
  const scrollRef = useRef<ElementRef<"div">>(null);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data.length]);
  return (
    <div className="flex flex-col gap-2">
      <div ref={scrollRef} />
      {data.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          characters={characters}
          lists={lists}
        />
      ))}
      {data.length === 0 && <Empty isCompleted={isCompleted} />}
    </div>
  );
};

export default MyTasks;
