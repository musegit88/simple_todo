"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { ColorResult, SketchPicker } from "react-color";
import { Popover, PopoverContent } from "./ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "./ui/button";

export type ColorPickerProps = {
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
};
const ColorPicker = ({ color, setColor }: ColorPickerProps) => {
  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className="w-8 h-8"
            style={{ background: color ? color : "#9ca3af" }}
          />
        </PopoverTrigger>
        <PopoverContent className="border-none shadow-none w-0 p-0">
          <SketchPicker
            color={color}
            onChange={(color: ColorResult) => setColor(color.hex)}
          />
        </PopoverContent>
      </Popover>
      <p className="text-sm text-muted-foreground">select color</p>
    </div>
  );
};

export default ColorPicker;
