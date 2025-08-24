import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  differenceInCalendarDays,
  endOfToday,
  endOfTomorrow,
  format,
  startOfToday,
  startOfYesterday,
} from "date-fns";
import { Calendar, Sun } from "lucide-react";

type OptimisticTaskCardProps = {
  optimisticTask: {
    id?: string;
    name: string;
    date: Date;
    userId?: string;
    listId?: string;
    dynamicPath?: string;
    googleTaskId?: string | null;
  };
};

const OptimisticTaskCard = ({ optimisticTask }: OptimisticTaskCardProps) => {
  return (
    <div className="w-full">
      <div className="group bg-gray-400/20 rounded-md flex w-full overflow-hidden">
        {/* checkbox */}
        <div className="px-1 flex items-center bg-blue-500">
          <Checkbox className="rounded-full" />
        </div>
        {/* end checkbox */}
        <div className="p-2 flex gap-2 w-full">
          {/* task card content */}
          <div className="flex-1 flex flex-col">
            <div className="w-32 sm:w-full">
              <p className="whitespace-nowrap overflow-x-scroll text-xs sm:text-base">
                {optimisticTask.name}
              </p>
            </div>
            {optimisticTask.date > endOfToday() &&
              optimisticTask.date > endOfTomorrow() && (
                <div className="flex items-center text-green-400 ml-4">
                  <Calendar size={12} />
                  <p className="text-xs ml-1">
                    {format(optimisticTask.date, "E, MMM d")}
                  </p>
                </div>
              )}
            {optimisticTask.date < startOfToday() &&
              optimisticTask.date >= startOfYesterday() && (
                <div className="flex items-center text-orange-500 ml-4">
                  <Calendar size={12} />
                  <p className="text-xs ml-1">Yesterday</p>
                </div>
              )}
            {optimisticTask.date >= startOfToday() &&
              optimisticTask.date <= endOfToday() && (
                <div className="flex items-center text-blue-400 ml-4">
                  <Sun size={12} />
                  <p className="text-xs ml-1">Today</p>
                </div>
              )}
            {optimisticTask.date > endOfToday() &&
              optimisticTask.date < endOfTomorrow() && (
                <div className="flex items-center text-lime-400 ml-4">
                  <Calendar size={12} />
                  <p className="text-xs ml-1">Tomorrow</p>
                </div>
              )}
            {optimisticTask.date < startOfYesterday() && (
              <div className="flex items-center ml-4">
                <Calendar size={12} />
                <p className="text-xs text-red-500 ml-1">
                  {differenceInCalendarDays(new Date(), optimisticTask.date)}{" "}
                  days ago
                </p>
              </div>
            )}
          </div>
          {/* end task card content */}
          <>
            <div className="opacity-100 md:opacity-0 md:group-hover:opacity-100 flex items-center gap-2"></div>
          </>
        </div>
      </div>
    </div>
  );
};

export default OptimisticTaskCard;
