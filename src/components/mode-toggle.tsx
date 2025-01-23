"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return;
  }
  return (
    <Button
      variant="ghost"
      size="icon"
      className="flex gap-1 text-lg"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" && <Sun size={18} />}
      {theme === "light" && <Moon size={18} />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
