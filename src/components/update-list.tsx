"use client";

import dynamic from "next/dynamic";

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
          <Edit size={14} className="text-emerald-400" />
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
