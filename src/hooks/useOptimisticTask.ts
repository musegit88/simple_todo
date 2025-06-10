import { Dispatch, SetStateAction } from "react";
import { create } from "zustand";

type useOptimisticTaskProps = {
  optimisticTask: {
    id?: string;
    name: string;
    date: Date;
    userId?: string;
    listId?: string;
    dynamicPath?: string;
    googleTaskId?: string | null;
  }[];
  setOptimisticTask: Dispatch<
    SetStateAction<
      {
        id: string;
        name: string;
        date: Date;
        userId: string;
        listId: string;
        dynamicPath: string;
        googleTaskId: string | null;
      }[]
    >
  >;
};

export const useOptimisticTask = create<useOptimisticTaskProps>((set) => ({
  optimisticTask: [],
  setOptimisticTask: (updater) =>
    set((state) => ({
      optimisticTask:
        typeof updater === "function"
          ? (
              updater as (
                prev: typeof state.optimisticTask
              ) => typeof state.optimisticTask
            )(state.optimisticTask)
          : updater,
    })),
}));
