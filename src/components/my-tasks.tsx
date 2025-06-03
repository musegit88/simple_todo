"use client";

import { ElementRef, useEffect, useRef } from "react";
import { toast } from "sonner";

import Empty from "@/components/empty";
import { MyTasksProps } from "@/types";
import TaskCard from "@/components/task-card";
import { useTaskIds } from "../../hooks/useTaskIds";
import { Checkbox } from "@/components/ui/checkbox";
import { handleTaskIds } from "@/lib/utils";

const MyTasks = ({ data, isCompleted, characters, lists }: MyTasksProps) => {
  const { taskIds, setTaskIds } = useTaskIds();
  const scrollRef = useRef<ElementRef<"div">>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data.length]);

  useEffect(() => {
    if (taskIds.length === 1) {
      toast.info("Please select another task");
    }
  }, [taskIds.length]);
  return (
    <div className="flex flex-col gap-2">
      <div ref={scrollRef} />
      {data.map((task) => (
        <div key={task.id} className="flex items-center gap-1 md:gap-2">
          {data.length > 1 && (
            <div className="self-start py-3">
              <Checkbox
                checked={taskIds.includes(task.id)}
                onCheckedChange={(checked) =>
                  handleTaskIds(checked, task.id, setTaskIds, taskIds)
                }
              />
            </div>
          )}
          <TaskCard
            key={task.id}
            task={task}
            characters={characters}
            lists={lists}
            isChecked={taskIds.includes(task.id)}
          />
        </div>
      ))}
      {data.length === 0 && <Empty isCompleted={isCompleted} />}
    </div>
  );
};

export default MyTasks;
