"use client";

import { usePathname } from "next/navigation";
import Highlighter from "react-highlight-words";
import {
  endOfToday,
  endOfTomorrow,
  format,
  startOfToday,
  startOfYesterday,
  differenceInCalendarDays,
} from "date-fns";
import { Calendar, Sun } from "lucide-react";

import { cn } from "@/lib/utils";
import { TaskCardContentProps } from "@/types";

const TaskCardContent = ({ characters, task }: TaskCardContentProps) => {
  const path = usePathname();
  return (
    <div className="flex-1 flex flex-col">
      {path !== "/search" && (
        <div className="w-32 sm:w-full">
          <p
            className={cn(
              "whitespace-nowrap overflow-x-scroll text-xs sm:text-base",
              task.completed === true && "line-through"
            )}
          >
            {task.name}
          </p>
        </div>
      )}
      {path === "/search" && (
        <div className="w-32 sm:w-full">
          <p className="whitespace-nowrap overflow-x-scroll text-xs sm:text-base">
            <Highlighter
              highlightClassName="bg-transparent text-green-400 font-bold"
              searchWords={[characters!]}
              autoEscape={true}
              textToHighlight={task.name}
            />
          </p>
        </div>
      )}
      {/* {path !== "/search" ? (
        <div className="w-32 sm:w-full">
          <p
            className={cn(
              "whitespace-nowrap overflow-x-scroll text-xs sm:text-base",
              task.completed === true && "line-through"
            )}
          >
            {task.name}
          </p>
        </div>
      ) : (
        <Highlighter
          highlightClassName="bg-transparent text-green-400 font-bold"
          searchWords={[characters!]}
          autoEscape={true}
          textToHighlight={task.name}
        />
      )} */}

      {task.duedate > endOfToday() && task.duedate > endOfTomorrow() && (
        <div className="flex items-center text-green-400 ml-4">
          <Calendar size={12} />
          <p className="text-xs ml-1">{format(task.duedate, "E, MMM d")}</p>
        </div>
      )}
      {task.duedate < startOfToday() && task.duedate >= startOfYesterday() && (
        <div className="flex items-center text-orange-500 ml-4">
          <Calendar size={12} />
          <p className="text-xs ml-1">Yesterday</p>
        </div>
      )}
      {task.duedate >= startOfToday() && task.duedate <= endOfToday() && (
        <div className="flex items-center text-blue-400 ml-4">
          <Sun size={12} />
          <p className="text-xs ml-1">Today</p>
        </div>
      )}
      {task.duedate > endOfToday() && task.duedate < endOfTomorrow() && (
        <div className="flex items-center text-lime-400 ml-4">
          <Calendar size={12} />
          <p className="text-xs ml-1">Tomorrow</p>
        </div>
      )}
      {task.duedate < startOfYesterday() && (
        <div className="flex items-center ml-4">
          <Calendar size={12} />
          <p className="text-xs text-red-500 ml-1">
            {differenceInCalendarDays(new Date(), task.duedate)} days ago
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskCardContent;
