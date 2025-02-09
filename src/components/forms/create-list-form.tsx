"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import IconPicker from "@/components/icon-picker";
import { DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreateListFromProps } from "@/types";
import { createListSchema } from "@/validator/create-list-schema";
import { createList } from "@/app/_actions/list.actions";
import ColorPicker from "../color-picker";

const CreateListForm = ({ userId }: CreateListFromProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof createListSchema>>({
    resolver: zodResolver(createListSchema),
    defaultValues: {
      name: "",
      icon: "",
      color: "",
      userId,
    },
  });
  const onSubmit = async (values: z.infer<typeof createListSchema>) => {
    try {
      await createList(values);
      toast.success(`${values.name} list created`);
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
              name="icon"
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
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      className={cn(
                        "outline-none w-full bg-transparent border focus-visible:ring-0 focus-visible:ring-offset-0",
                        form.formState.errors.name?.message &&
                          "placeholder:text-red-400"
                      )}
                      minLength={1}
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
          </div>
          <div className="flex justify-between">
            <div className="flex gap-1">
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ColorPicker
                        color={field.value!}
                        setColor={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={
                  !form.formState.isDirty ||
                  !form.control.getFieldState("name").isDirty
                }
              >
                Add
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateListForm;
