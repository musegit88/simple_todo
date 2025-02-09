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
        <AlertDialogTrigger
          className={cn("p-1", listColor && "bg-gray-400 rounded-md")}
          title="Delete list"
        >
          <Trash2
            className={cn(
              "w-4 h-4 sm:w-5 sm:h-5",
              listColor ? "text-red-900" : "text-red-500"
            )}
          />
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
