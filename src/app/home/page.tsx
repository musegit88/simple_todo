// This page shouldn't be accessed - middleware redirects to /tasks
// If it is accessed, redirect to tasks
import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/tasks");
}
