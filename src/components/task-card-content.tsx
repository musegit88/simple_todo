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
    <div className="flex w-full min-w-0 flex-col overflow-hidden">
      {path !== "/search" && (
        <div className="min-w-0 overflow-hidden">
          <p
            className={cn(
              "truncate overflow-hidden whitespace-nowrap",
              task.completed === true && "line-through",
            )}
          >
            {task.name}
          </p>
        </div>
      )}
      {path === "/search" && (
        <div className="min-w-0 overflow-hidden">
          <p className="truncate overflow-hidden whitespace-nowrap text-xs sm:text-base">
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
        <div className="bg-green-400/20 w-fit flex items-center ml-4 px-2 py-1 rounded-2xl">
          <Calendar size={12} />
          <p className="text-xs text-green-400 ml-1">
            {format(task.duedate, "E, MMM d")}
          </p>
        </div>
      )}
      {task.duedate < startOfToday() && task.duedate >= startOfYesterday() && (
        <div className="bg-orange-500/20 w-fit flex items-center ml-4 px-2 py-1 rounded-2xl">
          <Calendar size={12} />
          <p className="text-xs text-orange-500 ml-1">Yesterday</p>
        </div>
      )}
      {task.duedate >= startOfToday() && task.duedate <= endOfToday() && (
        <div className="bg-blue-400/20 w-fit flex items-center ml-4 px-2 py-1 rounded-2xl">
          <Sun size={12} />
          <p className="text-xs text-blue-400 ml-1">Today</p>
        </div>
      )}
      {task.duedate > endOfToday() && task.duedate < endOfTomorrow() && (
        <div className="bg-lime-400/20 w-fit flex items-center ml-4 px-2 py-1 rounded-2xl">
          <Calendar size={12} />
          <p className="text-xs text-lime-900 dark:text-lime-400 ml-1">
            Tomorrow
          </p>
        </div>
      )}
      {task.duedate < startOfYesterday() && (
        <div className="bg-red-500/20 w-fit flex items-center ml-4 px-2 py-1 rounded-2xl">
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
