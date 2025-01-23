"use client";

import { useState } from "react";

import { ChevronDown, ChevronRight } from "lucide-react";
import MyTasks from "./my-tasks";
import { CompletedTasksProps } from "@/types";

const CompletedTasks = ({ completedTasks, lists }: CompletedTasksProps) => {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col mt-2">
      <div
        className="bg-gray-400/20 w-fit px-2 py-1 rounded-sm flex items-center"
        onClick={() => setShow((prev) => !prev)}
      >
        {show ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        <p>Completed</p>
        <p className="ml-1">{completedTasks.length}</p>
      </div>
      {show && <MyTasks data={completedTasks} lists={lists} />}
    </div>
  );
};

export default CompletedTasks;
