"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

import { cn } from "@/lib/utils";
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
import { deleteList } from "@/app/_actions/list.actions";
import { DeleteListProps } from "@/types";

const DeleteList = ({ listId, listName, listColor }: DeleteListProps) => {
  const router = useRouter();

  const handleDeleteList = async () => {
    try {
      await deleteList(listId);
      router.refresh();
      router.push("/");
      toast.success("List deleted succesfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger title="Delete list">
          <div className="flex items-center gap-2 bg-background/20 hover:bg-background/10 transition-colors rounded-md px-1 py-0.5">
            <Trash2 className="text-red-500 w-4 h-4" />
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{" "}
              <strong>{listName}</strong>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteList}
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

export default DeleteList;
