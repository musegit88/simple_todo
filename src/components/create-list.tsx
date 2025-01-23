"use client";

import dynamic from "next/dynamic";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ListPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { CreateListProps } from "@/types";
import Loading from "@/app/loading";

// This function lets you dynamically import a component. It uses React.lazy() with Suspense under the hood.
const CreateListForm = dynamic(() => import("./forms/create-list-form"), {
  loading: () => <Loading />,
});

const CreateList = ({ userId }: CreateListProps) => {
  const router = useRouter();

  return (
    <div title="Create list">
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" variant="ghost">
            <ListPlus size={18} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create List</DialogTitle>
          </DialogHeader>
          <CreateListForm userId={userId} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateList;
