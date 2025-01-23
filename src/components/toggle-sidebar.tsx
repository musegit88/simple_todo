"use client";

import { useState } from "react";

import { AlignJustify } from "lucide-react";
import MobileSidebar from "@/components/mobile/mobile-sidebar";
import { ToggleSidebarProps } from "@/types";

const ToggleSidebar = ({ color, counts, user, lists }: ToggleSidebarProps) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div
        className="md:hidden p-2 w-10 rounded-md bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
        onClick={() => setShow(true)}
      >
        <AlignJustify color={color} />
      </div>
      <MobileSidebar
        show={show}
        setShow={setShow}
        counts={counts}
        user={user}
        lists={lists}
      />
    </>
  );
};

export default ToggleSidebar;
