"use client";

import { usePathname } from "next/navigation";
import { format } from "date-fns";
import {
  CalendarPlus2,
  CircleCheck,
  FileText,
  Home,
  List,
  Search,
  Settings,
  Star,
} from "lucide-react";

import { HeaderProps } from "@/types";

const Header = ({ color, title, listPath, listIcon }: HeaderProps) => {
  const path = usePathname();
  const date = new Date();
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        {path === "/home" && <Home color={color} />}
        {path === "/my-day" && <FileText color={color} />}
        {path === "/important" && <Star color={color} />}
        {path === "/planned" && <CalendarPlus2 color={color} />}
        {path === "/completed" && <CircleCheck color={color} />}
        {path === "/settings" && <Settings color={color} />}
        {path === "/search" && <Search color={color} />}
        {path === listPath && (
          <div>
            {listIcon && listIcon}
            {!listIcon && <List color={color} />}
          </div>
        )}
        <div className="flex items-center gap-2">
          <h1
            className="header_h1 w-52 sm:w-[800px] whitespace-nowrap overflow-x-scroll"
            style={{ color: color }}
          >
            {title}
          </h1>
        </div>
      </div>

      {path === "/my-day" && (
        <span className="text-[10px] md:text-xs font-light ml-8">
          {format(date, "EEEE, LLLL d")}
        </span>
      )}
    </div>
  );
};

export default Header;
