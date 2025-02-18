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

export const handleListsIds = (
  checked: boolean | string,
  listId: string,
  listsIds: string[],
  setListsIds: Dispatch<SetStateAction<string[]>>
) => {
  if (checked) {
    setListsIds((current: string[]) => [...current, listId]);
  }
  if (!checked) {
    const newListsIds = listsIds.filter((l: string) => l !== listId);
    setListsIds(newListsIds);
  }
};
