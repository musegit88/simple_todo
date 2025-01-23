"use client";

import { usePathname } from "next/navigation";
import { X } from "lucide-react";

import { ModeToggle } from "@/components/mode-toggle";
import Searchbar from "@/components/searchbar";
import UserDropdown from "@/components/user-button";
import MobileLists from "@/components/mobile/mobile-list";
import { MobileSidebarProps } from "@/types";

const MobileSidebar = ({ show, setShow, user, lists }: MobileSidebarProps) => {
  const path = usePathname();

  return (
    <>
      {show && (
        <>
          <div
            className="mobile_sidebar_overlay"
            onClick={() => setShow(false)}
          />
          <div className="mobile_sidebar z-10">
            <div className="flex flex-col justify-between h-full p-4 space-y-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center w-full">
                  <div className="flex items-center  gap-2">
                    <UserDropdown user={user} />
                    <ModeToggle />
                  </div>
                  <div className="flex justify-end w-full">
                    <X onClick={() => setShow(false)} />
                  </div>
                </div>
                <div className="flex flex-col space-y-6 h-full">
                  <Searchbar setShow={setShow} show={show} />
                  {/*Mobile list view*/}
                  <MobileLists
                    lists={lists}
                    setShow={setShow}
                    userId={user.id}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MobileSidebar;
