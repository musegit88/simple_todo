"use client";

import { useTaskIds } from "../hooks/useTaskIds";
import DeleteTasks from "./delete-tasks";
import ImportantTasks from "./important-tasks";
import { Button } from "./ui/button";

const ActionButtons = () => {
  const { taskIds, setTaskIds } = useTaskIds();

  return (
    <>
      {taskIds.length > 1 && (
        <div className="flex items-center gap-2">
          <DeleteTasks />
          <ImportantTasks />
          <Button
            onClick={() => setTaskIds([])}
            className="text-xs sm:text-base text-black dark:text-white border border-input bg-background hover:bg-accent hover:text-accent-foreground w-fit px-2 py-1 rounded-sm flex items-center gap-1 cursor-pointer"
            size="sm"
          >
            Cancle
          </Button>
        </div>
      )}
    </>
  );
};

export default ActionButtons;
