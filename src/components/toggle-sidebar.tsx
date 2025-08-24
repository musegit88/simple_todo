"use client";

import { useState } from "react";

import { AlignJustify } from "lucide-react";
import MobileSidebar from "@/components/mobile/mobile-sidebar";
import { ToggleSidebarProps } from "@/types";
import { useSidebar } from "@/hooks/useSidebar";

const ToggleSidebar = ({ color, counts, user, lists }: ToggleSidebarProps) => {
  const sidebar = useSidebar();
  return (
    <>
      <div
        className="md:hidden p-2 w-10 rounded-md bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
        onClick={sidebar.onOpen}
      >
        <AlignJustify color={color} />
      </div>
      <MobileSidebar counts={counts} user={user} lists={lists} />
    </>
  );
};

export default ToggleSidebar;
