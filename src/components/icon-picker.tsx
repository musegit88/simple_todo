"use client";

import { useTheme } from "next-themes";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { Smile } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { IconPickerProps } from "@/types";

const IconPicker = ({ icon, setIcon }: IconPickerProps) => {
  const { resolvedTheme } = useTheme();
  const selectedTheme = (resolvedTheme || "light") as keyof typeof themeMap;
  const themeMap = {
    dark: Theme.DARK,
    light: Theme.LIGHT,
  };
  const theme = themeMap[selectedTheme];
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon">
            {icon ? <>{icon}</> : <Smile size={14} />}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="border-none shadow-none p-0">
          <EmojiPicker
            lazyLoadEmojis
            theme={theme}
            onEmojiClick={(emoji) => setIcon(emoji.emoji)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default IconPicker;
