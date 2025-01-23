"use client";

import { useRouter } from "next/navigation";
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
import { deleteList } from "@/app/_actions/list.actions";
import { DeleteListProps } from "@/types";

const DeleteList = ({ listId, listName }: DeleteListProps) => {
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
        <AlertDialogTrigger>
          <div className="cursor-pointer text-red-500" title="Delete list">
            <Trash2 size={14} />
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
