"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { links } from "@/lib/constants";
import Searchbar from "@/components/searchbar";
import Counter from "@/components/counter";
import { SidebarProps } from "@/types";
import Lists from "@/components/lists";

const Sidebar = ({ counts, lists, userId }: SidebarProps) => {
  const path = usePathname();

  return (
    <div className="sidebar wrapper overflow-y-auto">
      <div className="flex flex-col w-full space-y-6">
        <div className="flex flex-col space-y-6">
          <Searchbar />
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative flex items-center justify-between hover:bg-gray-400/20 transition-colors px-2 py-2 rounded-md",
                path === link.href &&
                  "bg-gray-400/20 font-semibold border-[1px]"
              )}
              style={{ borderColor: path === link.href ? `${link.color}` : "" }}
            >
              <div className="flex items-center gap-2">
                <link.icon size={18} color={link.color} />
                <p
                  className={cn(
                    "font-light",
                    path === link.href && "font-semibold"
                  )}
                >
                  {link.title}
                </p>
              </div>

              {link.href === path && (
                <div
                  className={cn(
                    "absolute  left-0 h-[18px] rounded-tr-sm w-1 rounded-br-sm  overflow-x-hidden"
                  )}
                  style={{ backgroundColor: `${link.color}` }}
                />
              )}

              <Counter counts={counts} title={link.title} />
            </Link>
          ))}
        </div>
      </div>
      <div>
        <Lists lists={lists} userId={userId} />
      </div>
    </div>
  );
};

export default Sidebar;
