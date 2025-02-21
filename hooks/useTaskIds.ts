import { Dispatch, SetStateAction } from "react";
import { create } from "zustand";

type useTaskIdsProps = {
  taskIds: string[];
  setTaskIds: Dispatch<SetStateAction<string[]>>;
};

export const useTaskIds = create<useTaskIdsProps>((set) => ({
  taskIds: [],
  setTaskIds: (action) =>
    set((state) => ({
      taskIds: typeof action === "function" ? action(state.taskIds) : action,
    })),
}));
