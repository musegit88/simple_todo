"use client";

import dynamic from "next/dynamic";

import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import Loading from "@/app/loading";
import { UpdateListProps } from "@/types";

// This function lets you dynamically import a component. It uses React.lazy() with Suspense under the hood.
const UpdateListFrom = dynamic(() => import("./forms/update-list-form"), {
  loading: () => <Loading />,
});

const UpdateList = ({ list }: UpdateListProps) => {
  return (
    <div className="flex justify-end gap-2 cursor-pointer">
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex items-center gap-2 bg-background/20 hover:bg-background/10 transition-colors rounded-md px-1 py-0.5">
            <Edit className="text-emerald-400 w-4 h-4" />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update List</DialogTitle>
          </DialogHeader>
          <UpdateListFrom list={list} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateList;
