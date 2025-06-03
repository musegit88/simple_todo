"use client";

import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { SmartDatetimeInput } from "@/components/extension/smart-datetime-input";
import { taskFormSchema } from "@/validator/task-form-schema";
import { createTask } from "@/app/_actions/tasks.action";
import { createGoogleTask } from "@/app/_actions/google.tasks.action";

type MobileCreateTaskFormProps = {
  userId: string;
};

const MobileCreateTaskForm = ({ userId }: MobileCreateTaskFormProps) => {
  const router = useRouter();
  const path = usePathname();

  const dynamicPath = `/list/${path.split("/")[2]}`;
  const listId = path.split("/")[2];

  const form = useForm<z.infer<typeof taskFormSchema>>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      path,
      name: "",
      date: undefined,
      listId,
      dynamicPath,
      userId: userId,
    },
  });
  const onSubmit = async (values: z.infer<typeof taskFormSchema>) => {
    const googleTask = await createGoogleTask(
      userId,
      values.name,
      values.date!
    );
    try {
      await createTask({
        googleTaskId: googleTask.id ? googleTask.id : null,
        ...values,
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      form.reset();
      router.refresh();
    }
  };
  return (
    <div className="grid gap-4 py-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      className={cn(
                        " outline-none w-full bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0",
                        form.formState.errors.name?.message &&
                          "placeholder:text-red-400"
                      )}
                      placeholder={
                        form.formState.errors.name?.message
                          ? form.formState.errors.name?.message
                          : "Type something"
                      }
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
                <FormItem className="w-full">
                  <FormControl>
                    <SmartDatetimeInput
                      name="datetime"
                      value={field.value}
                      onValueChange={field.onChange}
                      placeholder="e.g. tomorrow at 3pm"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={!form.formState.isDirty}>
              Save changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default MobileCreateTaskForm;
