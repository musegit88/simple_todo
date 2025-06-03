"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleAlert } from "lucide-react";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-4">
            <CircleAlert className="text-yellow-400" />
            <h2>Something went wrong</h2>
          </CardTitle>
          <CardDescription>
            There was a problem when trying to authenticate.
          </CardDescription>
          <CardContent className="p-0">
            <Link href={"/signin"}>
              <Button className="w-full mt-2">Please try again!</Button>
            </Link>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default page;
