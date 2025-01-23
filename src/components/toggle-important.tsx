"use client";

import { useRouter } from "next/navigation";
import { startTransition, useOptimistic, useState } from "react";
import { toast } from "sonner";
import { Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { markAsImportant, removeImportant } from "@/app/_actions/tasks.action";
import { ToggleImportantProps } from "@/types";

const ToggleImportant = ({ task }: ToggleImportantProps) => {
  const router = useRouter();
  const [important, setImportant] = useState(task.important);

  const [optimisticImportant, addOptimisticImportant] =
    useOptimistic(important);

  const handleImportantClick = async () => {
    if (task.important === true) {
      startTransition(async () => {
        addOptimisticImportant(!important);
        await removeImportant(task.id, task.userId);
        setImportant(!important);
        toast.success(`${task.name} removed from important`);
        router.refresh();
      });
    } else {
      startTransition(async () => {
        addOptimisticImportant(!important);
        await markAsImportant(task.id, task.userId);
        setImportant(!important);
        toast.success(`${task.name} Marked as Important`);
        router.refresh();
      });
    }
  };
  return (
    <div
      className="flex items-center justify-center w-fit cursor-pointer"
      title={
        task.important === true ? "remove importance" : "mark as important"
      }
    >
      <div onClick={handleImportantClick}>
        <Star
          className={cn(
            optimisticImportant
              ? "text-yellow-400 fill-yellow-400 transition duration-1000"
              : "text-yellow-400"
          )}
          size={18}
        />
      </div>
    </div>
  );
};

export default ToggleImportant;
