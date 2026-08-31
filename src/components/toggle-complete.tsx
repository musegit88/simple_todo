"use client";

import { useRouter } from "next/navigation";
import { startTransition, useOptimistic, useState } from "react";
import { CircleCheck } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { ToggleCompleteProps } from "@/types";
import { markAsCompleted, removeCompleted } from "@/app/_actions/tasks.action";
import {
  markGoogleTaskCompleted,
  unmarkGoogleTaskCompleted,
} from "@/app/_actions/google.tasks.action";

const ToggleComplete = ({ task }: ToggleCompleteProps) => {
  const router = useRouter();
  const [completed, setCompleted] = useState(task.completed);
  const [optimisticCompleted, addOptimisticCompleted] =
    useOptimistic(completed);
  const handleCompletedClick = async () => {
    if (task.completed === true) {
      startTransition(async () => {
        addOptimisticCompleted(!completed);
        if (task.googleTaskId) {
          await unmarkGoogleTaskCompleted(task.userId, task.googleTaskId);
        }
        await removeCompleted(task.id, task.userId);
        setCompleted(!completed);
        toast.success("Task removed from completed");
        router.refresh();
      });
    } else {
      startTransition(async () => {
        addOptimisticCompleted(!completed);
        if (task.googleTaskId) {
          await markGoogleTaskCompleted(task.userId, task.googleTaskId);
        }
        await markAsCompleted(task.id, task.userId);
        setCompleted(!completed);
        toast.success("Task completed");
        router.refresh();
      });
    }
  };
  return (
    <div className={cn("flex items-center w-full cursor-pointer")}>
      <div
        className="flex items-center w-full gap-2"
        onClick={handleCompletedClick}
      >
        <CircleCheck
          className={cn(
            "w-5 h-5",
            optimisticCompleted ? "text-green-500" : "text-blue-500",
          )}
        />
        <span>Completed</span>
      </div>
    </div>
  );
};

export default ToggleComplete;
