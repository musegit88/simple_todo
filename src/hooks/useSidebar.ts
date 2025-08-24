import { create } from "zustand";

type useSidebarProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useSidebar = create<useSidebarProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
