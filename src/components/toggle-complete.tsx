"use client";

import { useRouter } from "next/navigation";
import { startTransition, useOptimistic, useState } from "react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { markAsCompleted, removeCompleted } from "@/app/_actions/tasks.action";
import { ToggleCompleteProps } from "@/types";

const ToggleComplete = ({ task }: ToggleCompleteProps) => {
  const router = useRouter();
  const [completed, setCompleted] = useState(task.completed);
  const [optimisticCompleted, addOptimisticCompleted] =
    useOptimistic(completed);
  const handleCompletedClick = async () => {
    if (task.completed === true) {
      startTransition(async () => {
        addOptimisticCompleted(!completed);
        await removeCompleted(task.id, task.userId);
        setCompleted(!completed);
        toast.success("Task removed from completed");
        router.refresh();
      });
    } else {
      startTransition(async () => {
        addOptimisticCompleted(!completed);
        await markAsCompleted(task.id, task.userId);
        setCompleted(!completed);
        toast.success("Task completed");
        router.refresh();
      });
    }
  };
  return (
    <div
      className={cn(
        "px-1 flex items-center",
        optimisticCompleted === true ? "bg-green-500" : "bg-blue-500"
      )}
    >
      <Checkbox
        className="rounded-full"
        checked={optimisticCompleted}
        onCheckedChange={handleCompletedClick}
      />
    </div>
  );
};

export default ToggleComplete;
