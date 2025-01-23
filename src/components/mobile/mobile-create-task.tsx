"use client";

import React from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MobileCreateTaskProps } from "@/types";
import Loading from "@/app/loading";

// This function lets you dynamically import a component. It uses React.lazy() with Suspense under the hood.
const MobileCreateTaskForm = dynamic(
  () => import("@/components/forms/mobile-create-task-form"),
  {
    loading: () => <Loading />,
  }
);

const MobileCreateTask = ({ userId }: MobileCreateTaskProps) => {
  const path = usePathname();

  return (
    <>
      {path !== "/completed" &&
        path !== "/planned" &&
        path !== "/search" &&
        path !== "/settings" && (
          <div className="md:hidden absolute bottom-20 right-5">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary">
                  <Plus />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create Task</DialogTitle>
                </DialogHeader>
                <MobileCreateTaskForm userId={userId} />
              </DialogContent>
            </Dialog>
          </div>
        )}
    </>
  );
};

export default MobileCreateTask;
