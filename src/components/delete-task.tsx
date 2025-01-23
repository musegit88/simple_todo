"use client";

import { toast } from "sonner";
import { Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DeleteTaskProps } from "@/types";
import { deleteTask } from "@/app/_actions/tasks.action";

const DeleteTask = ({ task }: DeleteTaskProps) => {
  const handleTaskDelete = async () => {
    try {
      await deleteTask(task.id, task.userId);
      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <div className="cursor-pointer text-red-500" title="Delete task">
            <Trash2 size={18} />
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{" "}
              <strong>{task.name}.</strong>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleTaskDelete}
              className="bg-red-500 hover:bg-red-500"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteTask;
