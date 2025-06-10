"use client";

import { useTaskIds } from "../hooks/useTaskIds";
import DeleteTasks from "./delete-tasks";

const ActionButtons = () => {
  const { taskIds, setTaskIds } = useTaskIds();

  return (
    <>
      {taskIds.length > 1 && (
        <div className="flex gap-2">
          <DeleteTasks />
          <div
            onClick={() => setTaskIds([])}
            className="text-xs sm:text-base border border-input bg-background hover:bg-accent hover:text-accent-foreground w-fit px-2 py-1 rounded-sm flex items-center gap-1 cursor-pointer"
          >
            Cancle
          </div>
        </div>
      )}
    </>
  );
};

export default ActionButtons;
