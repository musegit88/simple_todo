"use client";

import { useRouter } from "next/navigation";
import { startTransition, useOptimistic, useState } from "react";
import { CircleX, SunDim } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { addtoMyDay, removeMyDay } from "@/app/_actions/tasks.action";
import { ToggleMydayProps } from "@/types";

const ToggleMyday = ({ task }: ToggleMydayProps) => {
  const router = useRouter();
  const [myday, setMyday] = useState(task.myday);

  const [optimisticMyday, addOptimisticMyday] = useOptimistic(myday);

  const handleMydayClick = async () => {
    if (task.myday === true) {
      startTransition(async () => {
        addOptimisticMyday(!myday);
        await removeMyDay(task.id, task.userId);
        setMyday(!myday);
        toast.success(`${task.name} removed from myday`);
        router.refresh();
      });
    } else {
      startTransition(async () => {
        addOptimisticMyday(!myday);
        await addtoMyDay(task.id, task.userId);
        setMyday(!myday);
        toast.success(`${task.name} added to myday`);
        router.refresh();
      });
    }
  };
  return (
    <div className="w-full cursor-pointer">
      <div
        onClick={handleMydayClick}
        className={cn("flex items-center w-full gap-2")}
        title={!task.myday ? "Add to my day" : "Remove from my day"}
      >
        {!optimisticMyday ? (
          <SunDim className="w-5 h-5 text-blue-400" />
        ) : (
          <CircleX className="w-5 h-5 text-purple-400" />
        )}
        <span>
          {!optimisticMyday ? "Mark as my day" : "Remove from my day"}
        </span>
      </div>
    </div>
  );
};

export default ToggleMyday;
