"use client";

import ToggleDetails from "@/components/toggle-details";
import ToggleMyday from "@/components/toggle-myday";
import DeleteTask from "@/components/delete-task";
import ToggleComplete from "@/components/toggle-complete";
import ToggleImportant from "@/components/toggle-important";
import TaskCardContent from "@/components/task-card-content";
import SelectList from "@/components/select-list";
import { TaskProps } from "@/types";

const TaskCard = ({ task, characters, lists, isChecked }: TaskProps) => {
  return (
    <div className="w-full">
      <div className="group bg-gray-400/20 rounded-tl-sm rounded-tr-sm md:rounded-sm  flex w-full overflow-hidden">
        <ToggleComplete task={task} />
        <div className="p-2 flex gap-2 w-full">
          <TaskCardContent task={task} characters={characters} />
          {!isChecked && (
            <>
              <div className="opacity-100 md:opacity-0 md:group-hover:opacity-100 flex items-center gap-2">
                <SelectList lists={lists} task={task} />
                <ToggleDetails task={task} />
                <ToggleMyday task={task} />
                <DeleteTask task={task} />
              </div>
              <ToggleImportant task={task} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
