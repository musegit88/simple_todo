"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import ToggleDetails from "@/components/toggle-details";
import ToggleMyday from "@/components/toggle-myday";
import DeleteTask from "@/components/delete-task";
import ToggleComplete from "@/components/toggle-complete";
import ToggleImportant from "@/components/toggle-important";
import TaskCardContent from "@/components/task-card-content";
import SelectList from "@/components/select-list";
import MobileDetails from "@/components/mobile/mobile-details";
import { TaskProps } from "@/types";

const TaskCard = ({ task, characters, lists }: TaskProps) => {
  const [showMobile, setShowMobile] = useState(false);

  return (
    <div>
      <div
        className={cn(
          "group bg-gray-400/20 rounded-tl-sm rounded-tr-sm md:rounded-sm  flex w-full overflow-hidden",
          !showMobile && "rounded-bl-sm rounded-br-sm"
        )}
      >
        <ToggleComplete task={task} />
        <div className="p-2 flex gap-2 w-full">
          <TaskCardContent task={task} characters={characters} />
          <div className="opacity-100 md:opacity-0 md:group-hover:opacity-100 flex items-center gap-2">
            <SelectList lists={lists} task={task} />
            <ToggleDetails
              task={task}
              setShowMobile={setShowMobile}
              showMobile={showMobile}
            />
            <ToggleMyday task={task} />
            <DeleteTask task={task} />
          </div>
          <ToggleImportant task={task} />
        </div>
      </div>
      {showMobile && (
        <MobileDetails
          task={task}
          showMobile={showMobile}
          setShowMobile={setShowMobile}
        />
      )}
    </div>
  );
};

export default TaskCard;
