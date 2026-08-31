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
    <div className="sidebar wrapper">
      <div className="flex flex-col w-full h-full min-h-0">
        <div className="flex flex-col space-y-6 flex-shrink-0">
          <Searchbar />
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative flex items-center justify-between hover:bg-gray-400/20 transition-colors px-2 py-2 rounded-2xl",
                path === link.href &&
                  "bg-gray-400/20 font-semibold border-[1px]",
              )}
              style={{ borderColor: path === link.href ? `${link.color}` : "" }}
            >
              <div className="flex items-center gap-2">
                <link.icon size={18} color={link.color} />
                <p
                  className={cn(
                    "font-light",
                    path === link.href && "font-semibold",
                  )}
                >
                  {link.title}
                </p>
              </div>

              {link.href === path && (
                <div
                  className={cn(
                    "absolute  left-0 h-[18px] rounded-tr-sm w-1 rounded-br-sm  overflow-x-hidden",
                  )}
                  style={{ backgroundColor: `${link.color}` }}
                />
              )}

              <Counter
                counts={counts}
                title={link.title}
                className="bg-background w-5 h-5 flex items-center justify-center text-xs rounded-full border"
              />
            </Link>
          ))}
        </div>

        <div className="flex-1 min-h-0">
          <Lists lists={lists} userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
