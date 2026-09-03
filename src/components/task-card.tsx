"use client";

import { GripVertical, MoreVertical, View } from "lucide-react";
import { cn } from "@/lib/utils";
import { TaskProps } from "@/types";

import DeleteTask from "./delete-task";
import ToggleMyday from "@/components/toggle-myday";
import ToggleComplete from "@/components/toggle-complete";
import ToggleImportant from "@/components/toggle-important";
import TaskCardContent from "@/components/task-card-content";
import SelectList from "@/components/select-list";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ToggleDetails from "./toggle-details";

const TaskCard = ({
  task,
  characters,
  lists,
  isChecked,
  dragHandleProps,
}: TaskProps) => {
  return (
    <div className="group border rounded-2xl flex w-full overflow-hidden hover:shadow-lg duration-300 transition-all">
      <div
        className={cn(
          "px-1 flex items-center",
          dragHandleProps && "cursor-grab active:cursor-grabbing",
          task.completed === true ? "bg-green-500" : "bg-blue-500",
        )}
        style={{ touchAction: "none" }}
        {...dragHandleProps?.attributes}
        {...dragHandleProps?.listeners}
      >
        <GripVertical
          className={cn(!dragHandleProps && "text-muted-foreground")}
        />
      </div>
      <div className="p-2 flex gap-2 w-full min-w-0">
        <div className="flex-1 min-w-0 overflow-hidden">
          <TaskCardContent task={task} characters={characters} />
        </div>
        <div className="flex w-36 shrink-0 items-center justify-end gap-2">
          {!isChecked && (
            <>
              <div className="flex items-center gap-2 sm:opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <SelectList lists={lists} task={task} />
                <ToggleDetails task={task} />
                <DeleteTask task={task} />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger title="more">
                  <MoreVertical className="w-5 h-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="space-y-2 w-72"
                  side="left"
                >
                  <DropdownMenuItem className="flex items-center gap-2">
                    <ToggleMyday task={task} />
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ToggleImportant task={task} />
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <ToggleComplete task={task} />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
