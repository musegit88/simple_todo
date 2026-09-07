"use client";

import { useRouter } from "next/navigation";
import { useTaskIds } from "@/hooks/useTaskIds";
import {
  getTasksMarkedUnImportant,
  markTasksImportantTasksById,
} from "@/app/_actions/tasks.action";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Button } from "./ui/button";

const ImportantTasks = () => {
  const { taskIds, setTaskIds } = useTaskIds();
  const [markedUnImportant, setMarkedUntImportant] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    // To fetch tasks that are not marked as important
    const fetch = async () => {
      const response = await getTasksMarkedUnImportant(taskIds);
      setMarkedUntImportant(response);
    };
    fetch();
  }, [taskIds]);

  const handelClick = async () => {
    try {
      const importantTasksCount = markedUnImportant.length;
      await markTasksImportantTasksById(markedUnImportant);
      router.refresh();
      setTaskIds([]);
      toast.success(`${importantTasksCount} tasks marked important`);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Button
      className="text-xs sm:text-base text-white bg-[#d946ef] hover:bg-[#d946ef]/90 w-fit px-2 py-1 rounded-2xl flex items-center gap-1 cursor-pointer disabled:cursor-wait"
      onClick={handelClick}
      disabled={markedUnImportant.length === 0}
      size="sm"
    >
      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 transition duration-1000" />
      {markedUnImportant.length} tasks
    </Button>
  );
};

export default ImportantTasks;
