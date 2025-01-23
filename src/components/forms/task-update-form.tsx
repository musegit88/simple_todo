"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { endOfToday, format, startOfToday } from "date-fns";
import { Calendar, Sun } from "lucide-react";

import { cn, removeKeyFromUrlQuery } from "@/lib/utils";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SmartDatetimeInput } from "@/components/extension/smart-datetime-input";
import { UpdateTaskFormProps } from "@/types";
import { taskUpdateFormSchema } from "@/validator/task-update-form";
import { updateTaskById } from "@/app/_actions/tasks.action";

const UpdateTaskForm = ({ task, setShow }: UpdateTaskFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const form = useForm<z.infer<typeof taskUpdateFormSchema>>({
    resolver: zodResolver(taskUpdateFormSchema),
    defaultValues: {
      name: task.name,
      date: task.duedate,
      description: task.description || undefined,
      taskId: task.id,
      userId: task.userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof taskUpdateFormSchema>) => {
    try {
      const response = await updateTaskById(values);
      toast.success(response.message);
      setShow(false);
      const url = removeKeyFromUrlQuery(searchParams);
      if (url) {
        router.push(url, { scroll: false });
      }
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="name">Task</Label>
                <FormControl>
                  <Input
                    className="bg-transparent outline-none w-full"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
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
                    className="w-full resize-none h-48 bg-transparent outline-none"
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

        <DialogFooter>
          <Button
            type="submit"
            variant="secondary"
            size="sm"
            disabled={!form.formState.isDirty}
          >
            Save changes
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default UpdateTaskForm;
