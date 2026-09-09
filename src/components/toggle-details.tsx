"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Inspect, Pen } from "lucide-react";

import { addKey, removeKeyFromUrlQuery } from "@/lib/utils";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import Details from "@/components/details";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import MobileDetails from "@/components/mobile/mobile-details";
import { ToggleDetailsProps } from "@/types";
import { useTaskViewDialog } from "@/hooks/useTaskViewDialog";

const ToggleDetails = ({ task }: ToggleDetailsProps) => {
  const path = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { open } = useTaskViewDialog();

  const handleClick = () => {
    open(task.id);
    const newUrl = addKey(path, task.id);
    router.push(newUrl, { scroll: false });
  };

  const removeQuery = (open: boolean) => {
    const url = removeKeyFromUrlQuery(searchParams, open);
    if (url) {
      router.push(url, { scroll: false });
    }
  };

  return (
    <>
      <div className="hidden md:flex items-center">
        <Dialog onOpenChange={(open) => removeQuery(open)}>
          <DialogTrigger>
            <div
              className="flex items-center hover:cursor-pointer"
              onClick={handleClick}
              title="Task details"
            >
              <Inspect className="w-5 h-5 text-emerald-400" />
            </div>
          </DialogTrigger>
          <Details task={task} />
        </Dialog>
      </div>
      <div className="flex items-center md:hidden">
        <Drawer>
          <DrawerTrigger className="text-emerald-400" onClick={handleClick}>
            <Inspect className="w-4 h-4" />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerTitle className="hidden"></DrawerTitle>
            <MobileDetails task={task} />
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
};

export default ToggleDetails;
