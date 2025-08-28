"use client";

import { useRouter } from "next/navigation";
import { useTaskIds } from "@/hooks/useTaskIds";
import { markTasksImportantTasksById } from "@/app/_actions/tasks.action";
import { toast } from "sonner";

const ImportantTasks = () => {
  const { taskIds, setTaskIds } = useTaskIds();
  const router = useRouter();

  const handelClick = async () => {
    try {
      const importantTasksCount = taskIds.length;
      await markTasksImportantTasksById(taskIds);
      router.refresh();
      setTaskIds([]);
      toast.success(`${importantTasksCount} tasks marked important`);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div
      className="text-xs sm:text-base bg-[#d946ef] hover:bg-[#d946ef]/90 w-fit px-2 py-1 rounded-sm flex items-center gap-1 cursor-pointer"
      onClick={handelClick}
    >
      Important {taskIds.length} tasks
    </div>
  );
};

export default ImportantTasks;
