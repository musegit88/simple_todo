"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
import { useTaskIds } from "../../hooks/useTaskIds";
import { deleteTasksById, getTaskNamesById } from "@/app/_actions/tasks.action";
import { toast } from "sonner";

const DeleteTasks = () => {
  const { taskIds, setTaskIds } = useTaskIds();
  const router = useRouter();
  const [taskNames, setTaskNames] = useState<string[]>([]);
  console.log(taskNames);
  useEffect(() => {
    const handelTaskNames = async () => {
      const names = await getTaskNamesById(taskIds);
      setTaskNames(names);
    };
    handelTaskNames();
  }, [taskIds]);

  const handleDeleteSelectedTasks = async () => {
    try {
      const deletedCount = taskIds.length;
      await deleteTasksById(taskIds);
      router.refresh();
      setTaskIds([]);
      toast.success(`${deletedCount} tasks deleted successfully`);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="bg-destructive text-destructive-foreground hover:bg-destructive/90 w-fit px-2 py-1 rounded-sm flex items-center gap-1 cursor-pointer">
          Delete {taskIds.length} tasks
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            <strong className="text-red-500">
              {taskNames.map((taskName) => taskName).toString()}
            </strong>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDeleteSelectedTasks()}
            className="bg-red-500 hover:bg-red-500"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTasks;
