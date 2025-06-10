"use client";

import { usePathname, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

import { ArrowUp, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SmartDatetimeInput } from "@/components/extension/smart-datetime-input";
import { TaskFormProps } from "@/types";
import { taskFormSchema } from "@/validator/task-form-schema";
import { createTask } from "@/app/_actions/tasks.action";
import { createGoogleTask } from "@/app/_actions/google.tasks.action";
import { useOptimisticTask } from "../../hooks/useOptimisticTask";

const TaskForm = ({ user }: TaskFormProps) => {
  const router = useRouter();
  const path = usePathname();
  const userId = user.id;
  const { setOptimisticTask } = useOptimisticTask();

  const dynamicPath = `/list/${path.split("/")[2]}`;
  const listId = path.split("/")[2];

  const form = useForm<z.infer<typeof taskFormSchema>>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      path,
      name: "",
      date: undefined,
      // If the task is created in list page
      listId,
      // If the task is created in list page
      dynamicPath,
      userId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof taskFormSchema>) => {
    setOptimisticTask([
      {
        id: "",
        name: values.name,
        date: values.date === undefined ? new Date() : values.date,
        listId: values.listId!,
        userId: values.userId,
        dynamicPath: values.dynamicPath,
        googleTaskId: null, // or set as needed
      },
    ]);
    // create task in google tasks if google tasks integration is enabled in user preferences
    const googleTask = await createGoogleTask(
      userId,
      user.googleTaskIntegration,
      values.name,
      values.date!
    );
    // create task
    try {
      const response = await createTask({
        googleTaskId: googleTask ? googleTask?.id : null,
        ...values,
      });
      toast.success(response.message);
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      form.reset();
      router.refresh();
    }
  };

  return (
    <>
      {path !== "/completed" &&
        path !== "/planned" &&
        path !== "/search" &&
        path !== "/settings" && (
          <div className="wrapper">
            <div className="flex justify-center p-1 md:p-2">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-full px-2 py-1 md:px-4 md:py-2 rounded-sm border bg-background flex items-center"
                >
                  <div className="flex items-center gap-x-2 w-full">
                    <div className="flex items-center w-full">
                      <Plus className="mr-2" />
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormControl>
                              <Input
                                className={cn(
                                  "outline-none w-full bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0",
                                  form.formState.errors.name?.message &&
                                    "placeholder:text-red-400"
                                )}
                                placeholder={
                                  form.formState.errors.name?.message
                                    ? form.formState.errors.name?.message
                                    : "Type something"
                                }
                                maxLength={100}
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <SmartDatetimeInput
                              name="datetime"
                              value={field.value}
                              onValueChange={field.onChange}
                              placeholder="e.g. tomorrow at 4pm"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <Button type="submit" variant="secondary">
                      <ArrowUp size={18} />
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        )}
    </>
  );
};

export default TaskForm;
