"use client";

import { usePathname } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useTaskIds } from "../hooks/useTaskIds";
import { Tasks } from "@prisma/client";

type TaskSelectorProps = {
  tasks: Tasks[];
};

const TaskSelector = ({ tasks }: TaskSelectorProps) => {
  const { taskIds, setTaskIds } = useTaskIds();
  const path = usePathname();
  return (
    <div>
      {tasks.length > 1 && (
        <div className="flex items-center gap-2">
          <Checkbox
            id="checkbox"
            title="select all"
            checked={taskIds.length === tasks.length}
            onCheckedChange={(checked) =>
              checked
                ? setTaskIds(tasks.map((task) => task.id))
                : setTaskIds([])
            }
          />
          {path !== "/" && (
            <Label
              htmlFor="checkbox"
              className="text-xs sm:text-base border border-input bg-background hover:bg-accent hover:text-accent-foreground w-fit px-2 py-1 rounded-sm flex items-center gap-1 cursor-pointer"
            >
              select all
            </Label>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskSelector;
