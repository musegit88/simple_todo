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
    <div className="cursor-pointer">
      <div
        onClick={handleMydayClick}
        className={cn(!optimisticMyday ? "text-blue-400" : "text-purple-400")}
        title={!task.myday ? "Add to my day" : "Remove from my day"}
      >
        {!optimisticMyday ? <SunDim size={18} /> : <CircleX size={18} />}
      </div>
    </div>
  );
};

export default ToggleMyday;
