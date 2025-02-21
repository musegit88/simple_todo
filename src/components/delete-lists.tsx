"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { deleteLists, getListNamesById } from "@/app/_actions/list.actions";
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
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type DeleteListsProps = {
  listsIds: string[];
  setListIds: Dispatch<SetStateAction<string[]>>;
};

const DeleteLists = ({ listsIds, setListIds }: DeleteListsProps) => {
  const router = useRouter();
  const [listsNames, setListNames] = useState<string[]>([]);
  console.log(listsNames);
  useEffect(() => {
    const handelListNames = async () => {
      const names = await getListNamesById(listsIds);
      setListNames(names!);
    };
    handelListNames();
  }, [listsIds]);
  const handleDeleteSelectedList = async () => {
    try {
      const deletedCount = listsIds.length;
      await deleteLists(listsIds);
      router.refresh();
      setListIds([]);
      toast.success(`${deletedCount} lists deleted successfully`);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <span>Delete {listsIds.length} lists</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            <strong className="text-red-500">
              {listsNames.map((listName) => listName).toString()}
            </strong>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDeleteSelectedList()}
            className="bg-red-500 hover:bg-red-500"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteLists;
