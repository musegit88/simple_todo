"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { Search } from "lucide-react";

import { useSidebar } from "@/hooks/useSidebar";

const Searchbar = () => {
  const sidebar = useSidebar();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const search = () => {
    if (query) {
      const value = query;
      const newUrl = qs.stringifyUrl({
        url: "/search",
        query: { query: value },
      });
      router.push(newUrl, { scroll: false });
      setQuery("");
    }
    if (sidebar.isOpen) {
      sidebar.onClose();
    }
  };
  return (
    <div className="w-full px-2 py-2 rounded-sm border bg-background flex items-center">
      <input
        type="text"
        placeholder="search"
        maxLength={255}
        className="outline-none w-full bg-transparent"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="flex bg-background cursor-pointer" onClick={search}>
        <Search size={18} />
      </div>
    </div>
  );
};

export default Searchbar;
