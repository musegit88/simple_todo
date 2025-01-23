"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { updateList } from "@/app/_actions/list.actions";
import { updateListSchema } from "@/validator/update-list-schema";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import IconPicker from "@/components/icon-picker";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UpdateListFromProps } from "@/types";

const UpdateListForm = ({ list }: UpdateListFromProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof updateListSchema>>({
    resolver: zodResolver(updateListSchema),
    defaultValues: {
      listName: list.name,
      listIcon: list.icon,
      listId: list.id,
      userId: list.userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof updateListSchema>) => {
    try {
      await updateList(values);
      toast.success(`${values.listName} list updated`);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-2"
        >
          <div className="flex items-center gap-2">
            <FormField
              control={form.control}
              name="listIcon"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <IconPicker icon={field.value!} setIcon={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="listName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      className={cn(
                        "outline-none w-full bg-transparent border focus-visible:ring-0 focus-visible:ring-offset-0",
                        form.formState.errors.listName?.message &&
                          "placeholder:text-red-400"
                      )}
                      minLength={1}
                      placeholder={
                        form.formState.errors.listName?.message
                          ? form.formState.errors.listName?.message
                          : "Type something"
                      }
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={!form.formState.isDirty}>
              Update
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UpdateListForm;
