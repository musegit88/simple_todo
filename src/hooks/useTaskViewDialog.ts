import { create } from "zustand";

type useTaskViewDialogProps = {
  openTaskId: string | null;
  open: (id: string) => void;
  close: () => void;
};

export const useTaskViewDialog = create<useTaskViewDialogProps>((set) => ({
  openTaskId: null,
  open: (id) => set({ openTaskId: id }),
  close: () => set({ openTaskId: null }),
}));
