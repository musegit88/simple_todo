"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  differenceInCalendarDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  endOfToday,
  format,
  startOfToday,
} from "date-fns";
import { toast } from "sonner";
import { Calendar, CalendarDays, Clock, Sun } from "lucide-react";

import { addKey, cn, removeKeyFromUrlQuery } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { SmartDatetimeInput } from "@/components/extension/smart-datetime-input";
import { taskUpdateFormSchema } from "@/validator/task-update-form";
import { MobileDetailsProps } from "@/types";
import { updateTaskById } from "@/app/_actions/tasks.action";

const MobileDetails = ({
  task,
  showMobile,
  setShowMobile,
}: MobileDetailsProps) => {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof taskUpdateFormSchema>>({
    resolver: zodResolver(taskUpdateFormSchema),
    defaultValues: {
      name: task.name!,
      date: task.duedate,
      description: task.description || undefined,
      taskId: task.id,
      userId: task.userId,
    },
  });
  const onSubmit = async (values: z.infer<typeof taskUpdateFormSchema>) => {
    try {
      await updateTaskById(values);
      toast.success("Task updated successfully");
      setShowMobile(false);
      const url = removeKeyFromUrlQuery(searchParams);
      if (url) {
        router.push(url, { scroll: false });
      }
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  if (showMobile) {
    const newUrl = addKey(path, task.id);
    router.push(newUrl, { scroll: false });
  }
  return (
    <div className="flex flex-col gap-2 md:hidden border rounded-bl-sm rounded-br-sm w-full p-2 overflow-hidden">
      <div className="flex items-center w-full">
        {differenceInCalendarDays(new Date(), task.createdAt) >= 1 && (
          <div className="flex items-center">
            <CalendarDays size={18} />
            <p className="flex items-center w-full text-xs ml-2">
              Created {differenceInCalendarDays(new Date(), task.createdAt)} day
              {differenceInCalendarDays(new Date(), task.createdAt) > 1 &&
                `s`}{" "}
              ago
            </p>
          </div>
        )}
        {differenceInCalendarDays(new Date(), task.createdAt) < 1 &&
          differenceInHours(new Date(), task.createdAt) >= 1 && (
            <div className="flex items-center">
              <Clock size={18} />
              <p className="flex items-center w-full text-xs ml-2">
                {differenceInHours(new Date(), task.createdAt)} hour{" "}
                {differenceInHours(new Date(), task.createdAt) > 1 && `s`} ago
              </p>
            </div>
          )}
        {differenceInHours(new Date(), task.createdAt) < 1 &&
          differenceInMinutes(new Date(), task.createdAt) > 1 && (
            <div className="flex items-center">
              <Clock size={18} />
              <p className="flex items-center w-full text-xs ml-2">
                created {differenceInMinutes(new Date(), task.createdAt)} minute
                {differenceInMinutes(new Date(), task.createdAt) > 1 && `s`} ago
              </p>
            </div>
          )}
        {differenceInMinutes(new Date(), task.createdAt) < 1 && (
          <div className="flex items-center">
            <Clock size={18} />
            <p className="flex items-center w-full text-xs ml-2">
              created {differenceInSeconds(new Date(), task.createdAt)} seconds
              ago
            </p>
          </div>
        )}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col  gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="taskname">Task</Label>
                    <FormControl>
                      <Input
                        className="bg-transparent outline-none w-full"
                        placeholder="task name"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="description">Description/Notes</Label>
                  <FormControl>
                    <Textarea
                      maxLength={255}
                      placeholder="description"
                      className="w-full resize-none h-48 bg-transparent outline-none "
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <Label>Select date</Label>
                  <FormControl>
                    <div className="flex items-center justify-between w-full">
                      <div className="w-full">
                        <SmartDatetimeInput
                          name="datetime"
                          value={field.value}
                          onValueChange={field.onChange}
                          placeholder="e.g. tomorrow at 4pm"
                        />
                      </div>
                      {task.duedate >= endOfToday() && (
                        <div className="flex items-center justify-end w-full gap-2 text-xs text-green-500 ">
                          <Calendar />
                          <p>{format(task.duedate, "PPP")}</p>
                        </div>
                      )}
                      {task.duedate < startOfToday() && (
                        <div
                          className={cn(
                            "flex items-center justify-end w-full gap-2 text-xs text-red-500"
                          )}
                        >
                          <Calendar />
                          <p>{format(task.duedate, "PPP")}</p>
                        </div>
                      )}
                      {task.duedate <= endOfToday() &&
                        task.duedate >= startOfToday() && (
                          <div
                            className={cn(
                              "flex items-center justify-end w-full gap-2 text-xs text-blue-500"
                            )}
                          >
                            <Sun />
                            <p>Today</p>
                          </div>
                        )}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              variant="outline"
              size="sm"
              disabled={!form.formState.isDirty}
            >
              Save changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default MobileDetails;
