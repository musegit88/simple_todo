"use client";

import {
  differenceInCalendarDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";
import { CalendarDays, Clock } from "lucide-react";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DetailsProps } from "@/types";
import UpdateTaskForm from "@/components/forms/task-update-form";

const Details = ({ show, setShow, task }: DetailsProps) => {
  return (
    <>
      {show && (
        <DialogContent className="md:max-w-[500px] lg:min-h-min">
          <DialogHeader>
            <DialogTitle>Manage Task</DialogTitle>
            <div className="flex items-center w-full">
              {differenceInCalendarDays(new Date(), task.createdAt) >= 1 && (
                <div className="flex items-center">
                  <CalendarDays />
                  <p className="flex items-center w-full text-xs ml-2">
                    Created{" "}
                    {differenceInCalendarDays(new Date(), task.createdAt)} day
                    {differenceInCalendarDays(new Date(), task.createdAt) > 1 &&
                      `s`}{" "}
                    ago
                  </p>
                </div>
              )}
              {differenceInCalendarDays(new Date(), task.createdAt) < 1 &&
                differenceInHours(new Date(), task.createdAt) >= 1 && (
                  <div className="flex items-center">
                    <Clock />
                    <p className="flex items-center w-full text-xs ml-2">
                      {differenceInHours(new Date(), task.createdAt)} hour{" "}
                      {differenceInHours(new Date(), task.createdAt) > 1 && `s`}{" "}
                      ago
                    </p>
                  </div>
                )}
              {differenceInHours(new Date(), task.createdAt) < 1 &&
                differenceInMinutes(new Date(), task.createdAt) >= 1 && (
                  <div className="flex items-center">
                    <Clock />
                    <p className="flex items-center w-full text-xs ml-2">
                      created {differenceInMinutes(new Date(), task.createdAt)}{" "}
                      minute
                      {differenceInMinutes(new Date(), task.createdAt) > 1 &&
                        `s`}{" "}
                      ago
                    </p>
                  </div>
                )}
              {differenceInMinutes(new Date(), task.createdAt) < 1 && (
                <div className="flex items-center">
                  <Clock />
                  <p className="flex items-center w-full text-xs ml-2">
                    created {differenceInSeconds(new Date(), task.createdAt)}{" "}
                    seconds ago
                  </p>
                </div>
              )}
              {task.updatedAt > task.createdAt && (
                <>
                  {differenceInCalendarDays(new Date(), task.createdAt) >=
                    1 && (
                    <div className="flex items-center">
                      <CalendarDays />
                      <p className="flex items-center w-full text-xs ml-2">
                        Updated{" "}
                        {differenceInCalendarDays(new Date(), task.updatedAt)}{" "}
                        day
                        {differenceInCalendarDays(new Date(), task.updatedAt) >
                          1 && `s`}{" "}
                        ago
                      </p>
                    </div>
                  )}
                  {differenceInCalendarDays(new Date(), task.updatedAt) < 1 &&
                    differenceInHours(new Date(), task.updatedAt) >= 1 && (
                      <div className="flex items-center">
                        <Clock />
                        <p className="flex items-center w-full text-xs ml-2">
                          {differenceInHours(new Date(), task.updatedAt)} hour{" "}
                          {differenceInHours(new Date(), task.updatedAt) > 1 &&
                            `s`}{" "}
                          ago
                        </p>
                      </div>
                    )}
                  {differenceInHours(new Date(), task.updatedAt) < 1 &&
                    differenceInMinutes(new Date(), task.updatedAt) >= 1 && (
                      <div className="flex items-center">
                        <Clock />
                        <p className="flex items-center w-full text-xs ml-2">
                          updated{" "}
                          {differenceInMinutes(new Date(), task.updatedAt)}{" "}
                          minute
                          {differenceInMinutes(new Date(), task.updatedAt) >
                            1 && `s`}{" "}
                          ago
                        </p>
                      </div>
                    )}
                  {differenceInMinutes(new Date(), task.updatedAt) < 1 && (
                    <div className="flex items-center">
                      <Clock />
                      <p className="flex items-center w-full text-xs ml-2">
                        updated{" "}
                        {differenceInSeconds(new Date(), task.updatedAt)}{" "}
                        seconds ago
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </DialogHeader>
          <UpdateTaskForm task={task} setShow={setShow} />
        </DialogContent>
      )}
    </>
  );
};

export default Details;
