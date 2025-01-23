"use client";

import { usePathname } from "next/navigation";
import { format } from "date-fns";
import Image from "next/image";

import { EmptyProps } from "@/types";

const Empty = ({ isCompleted }: EmptyProps) => {
  const path = usePathname();
  const listId = path.split("/")[2];
  const listPath = `/${path.split("/")[1]}/${listId}`;
  const today = format(new Date(), "eeee").slice(0, 3);
  return (
    <>
      {path === "/" && !isCompleted && (
        <div className="flex flex-col items-center justify-center w-full">
          <div className="pt-20">
            <Image
              width={100}
              height={100}
              src="/assets/images/selection.svg"
              alt="image"
              className="w-40 h-40"
            />
          </div>
          <h1 className="font-semibold mt-4">No tasks yet</h1>
          <p className="text-xs md:text-sm text-muted-foreground">
            Add your to-dos
          </p>
        </div>
      )}
      {path === "/my-day" && (
        <div className="flex flex-col items-center justify-center w-full">
          <div className="relative pt-20">
            <Image
              width={100}
              height={100}
              src="/assets/images/myday.svg"
              alt="tasks"
              className="w-40 h-40"
            />
            <div className="absolute bottom-10 left-0 right-0  text-center m-auto">
              <h1 className="text-5xl font-extrabold text-[#6366f1]">
                {today}
              </h1>
            </div>
          </div>
          <h1 className="font-semibold mt-4">No tasks added to your day</h1>
          <p className="text-xs md:text-sm text-muted-foreground">
            Add a task to your day
          </p>
        </div>
      )}
      {path === "/important" && (
        <div className="flex flex-col items-center justify-center w-full">
          <div className="pt-20">
            <Image
              width={100}
              height={100}
              src="/assets/images/star.svg"
              alt="image"
              className="w-40 h-40"
            />
          </div>
          <h1 className="font-semibold mt-4">No starred tasks</h1>
          <p className="text-xs md:text-sm text-muted-foreground text-center">
            Mark important tasks with a star so you can easily find them here
          </p>
        </div>
      )}
      {path === "/planned" && (
        <div className="flex flex-col items-center justify-center w-full">
          <div className="pt-20">
            <Image
              width={100}
              height={100}
              src="/assets/images/online_calendar.svg"
              alt="image"
              className="w-40 h-40"
            />
          </div>
          <h1 className="font-semibold mt-4">No planned tasks found</h1>
          <p className="text-xs md:text-sm text-muted-foreground">
            Add task to your plan
          </p>
        </div>
      )}
      {path === "/completed" && (
        <div className="flex flex-col items-center justify-center w-full">
          <div className="pt-20">
            <Image
              width={100}
              height={100}
              src="/assets/images/check_boxes_completed.svg"
              alt="image"
              className="w-40 h-40"
            />
          </div>
          <h1 className="font-semibold mt-4">No completed tasks found</h1>
          <p className="text-xs md:text-sm text-muted-foreground">
            Complete a task to see it here
          </p>
        </div>
      )}
      {path === "/search" && (
        <div className="flex flex-col items-center justify-center w-full">
          <div className="pt-20">
            <Image
              width={100}
              height={100}
              src="/assets/images/not_found.svg"
              alt="image"
              className="w-40 h-40"
            />
          </div>
          <p className="text-xs md:text-sm text-muted-foreground">
            No task found.
          </p>
        </div>
      )}
      {path === listPath && (
        <div className="flex flex-col items-center justify-center w-full">
          <div className="pt-20">
            <Image
              width={100}
              height={100}
              src="/assets/images/tasks.svg"
              alt="image"
              className="w-40 h-40"
            />
          </div>
          <h1 className="font-semibold mt-4">No tasks yet</h1>
          <p className="text-xs md:text-sm text-muted-foreground">
            Add your tasks
          </p>
        </div>
      )}
    </>
  );
};

export default Empty;
