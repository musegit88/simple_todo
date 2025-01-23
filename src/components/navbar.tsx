"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import Header from "@/components/header";
import ToggleSidebar from "@/components/toggle-sidebar";
import { NavbarProps } from "@/types";
import { getListNameById } from "@/app/_actions/list.actions";

const Navbar = ({ counts, user, lists }: NavbarProps) => {
  const path = usePathname();

  const [listName, setListName] = useState<string | undefined>("");
  const [listIcon, setListIcon] = useState<string | undefined | null>("");
  const listId = path.split("/")[2];
  const listPath = `/${path.split("/")[1]}/${listId}`;

  // Find list name and icon by listId
  useEffect(() => {
    const findNameById = async () => {
      const list = await getListNameById(listId);
      setListName(list?.name);
      setListIcon(list?.icon);
    };
    findNameById();
  }, [listId]);

  const title =
    path === "/"
      ? "Tasks"
      : path === listPath
      ? listName
      : path.slice(1, path.length).split("-").join(" ");
  const color =
    path === "/my-day"
      ? "#6366f1"
      : path === "/important"
      ? "#d946ef"
      : path === "/planned"
      ? "#ec4899"
      : path === "/completed"
      ? "#22c55e"
      : "#14b8a6";

  return (
    <div className="wrapper">
      <div className="navbar ">
        <Header
          title={title}
          color={color}
          listPath={listPath}
          listIcon={listIcon!}
        />
        <ToggleSidebar
          color={color}
          counts={counts}
          user={user}
          lists={lists}
        />
      </div>
    </div>
  );
};

export default Navbar;
