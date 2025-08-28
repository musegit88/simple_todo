import { CalendarPlus2, CircleCheck, FileText, Home, Star } from "lucide-react";

export const links = [
  { title: "Tasks", href: "/home", icon: Home, color: "#14b8a6" },
  { title: "My Day", href: "/my-day", icon: FileText, color: "#6366f1" },
  {
    title: "Important",
    href: "/important",
    icon: Star,
    color: "#d946ef",
  },
  { title: "Planned", href: "/planned", icon: CalendarPlus2, color: "#ec4899" },
  {
    title: "Completed",
    href: "/completed",
    icon: CircleCheck,
    color: "#22c55e",
  },
];
