import { Dispatch, SetStateAction } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";
import { ReadonlyURLSearchParams } from "next/navigation";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const addKey = (path: string, taskId: string) => {
  const newUrl = qs.stringifyUrl({
    url: path,
    query: { task: taskId },
  });
  return newUrl;
};

export const removeKeyFromUrlQuery = (
  searchParams: ReadonlyURLSearchParams,
  open?: boolean
) => {
  if (!open) {
    const currentUrl = qs.parse(searchParams.toString());
    const keysToRemove = ["task"];
    keysToRemove.forEach((key: string | number) => {
      delete currentUrl[key];
    });
    const newUrl = qs.stringifyUrl({
      url: window.location.pathname,
      query: currentUrl,
    });
    return newUrl;
  }
};

// to select lists
export const handleListsIds = (
  checked: boolean | string,
  listId: string,
  listsIds: string[],
  setListIds: Dispatch<SetStateAction<string[]>>
) => {
  if (checked) {
    setListIds((current: string[]) => [...current, listId]);
  }
  if (!checked) {
    const newListsIds = listsIds.filter((l: string) => l !== listId);
    setListIds(newListsIds);
  }
};

// to select tasks
export const handleTaskIds = (
  checked: boolean | string,
  taskId: string,
  setTaskIds: Dispatch<SetStateAction<string[]>>,
  taskIds: string[]
) => {
  if (checked) {
    setTaskIds((current) => [...current, taskId]);
  }
  if (!checked) {
    const newTaskIds = taskIds.filter((tId) => tId !== taskId);
    setTaskIds(newTaskIds);
  }
};
