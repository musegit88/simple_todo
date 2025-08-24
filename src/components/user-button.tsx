"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { LogOutIcon, Settings } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { UserComponentProps } from "@/types";
import Link from "next/link";
import { useSidebar } from "@/hooks/useSidebar";

const UserButton = ({ user }: UserComponentProps) => {
  const sidebar = useSidebar();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center justify-start gap-2 w-full"
        >
          <div className="border-2 dark:border-white border-slate-500  rounded-full p-1">
            <Avatar className="w-6 h-6">
              <AvatarImage src={user.image!} />
              <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-left">{user.name}</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <Link href={"/settings"} onClick={sidebar.onClose}>
          <DropdownMenuItem>
            <div className="flex items-center gap-2">
              <Settings size={18} />
              <p>Settings</p>
            </div>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={() => signOut()}>
          <div className="flex items-center gap-2">
            <LogOutIcon size={18} />
            <p>Signout</p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
