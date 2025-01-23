"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { links } from "@/lib/constants";
import Counter from "@/components/counter";
import { MoileNavigationProps } from "@/types";

const MobileNavigation = ({ counts }: MoileNavigationProps) => {
  const path = usePathname();

  return (
    <div className="wrapper mobile_navbar">
      <div className="flex items-center justify-center w-full space-x-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "relative flex items-center justify-between hover:bg-gray-400/20 transition-all px-2 py-2 rounded-md",
              path === link.href && "bg-gray-400/20  border-[1px]"
            )}
            style={{ borderColor: path === link.href ? `${link.color}` : "" }}
          >
            <div className="flex items-center gap-2">
              <link.icon size={24} color={link.color} />
            </div>

            {link.href === path && (
              <div
                className={cn(
                  "absolute bottom-0 left-1/4 w-[18px] h-1 rounded-tr-sm rounded-tl-sm overflow-x-hidden"
                )}
                style={{ backgroundColor: `${link.color}` }}
              />
            )}
            <div className="absolute -top-2 -right-2">
              <Counter counts={counts} title={link.title} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileNavigation;
