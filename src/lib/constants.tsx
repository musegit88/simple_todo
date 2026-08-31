import {
  CalendarPlus2,
  CircleCheck,
  FileText,
  Sun,
  ListTodo,
  Star,
} from "lucide-react";

export const links = [
  { title: "Tasks", href: "/tasks", icon: ListTodo, color: "#14b8a6" },
  { title: "My Day", href: "/my-day", icon: Sun, color: "#6366f1" },
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
