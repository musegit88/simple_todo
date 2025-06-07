"use client";

import { signOut } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SelectSeparator } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  disableGoogleIntegration,
  enableGoogleIntegration,
} from "@/app/_actions/google.tasks.action";
import { useRouter } from "next/navigation";
import { UserProps } from "@/types";
import Image from "next/image";
import { startTransition, useOptimistic, useState } from "react";

type UserInfoProps = {
  user: UserProps;
};

const UserInfo = ({ user }: UserInfoProps) => {
  const router = useRouter();
  const [enabled, setEnabled] = useState(user.googleTaskIntegration);
  const [optimisticEnabled, addOptimisticEnabled] = useOptimistic(enabled);
  const handelCheckbox = async () => {
    if (user.googleTaskIntegration) {
      startTransition(async () => {
        addOptimisticEnabled(!enabled);
        await disableGoogleIntegration(user.id);
        setEnabled(!enabled);
        router.refresh();
      });
    } else {
      startTransition(async () => {
        addOptimisticEnabled(!enabled);
        await enableGoogleIntegration(user.id);
        setEnabled(!enabled);
        router.refresh();
      });
    }
  };
  return (
    <div className=" flex flex-col gap-4 lg:px-28">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2 md:gap-8">
          <Avatar className="w-12 h-12 md:w-20 md:h-20 border shadow-sm">
            <AvatarImage src={user.image!} />
            <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="md:text-2xl font-semibold">{user.name}</h1>
            <p className="text-xs md:text-lg text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>

        <Button
          variant="destructive"
          className="px-4 md:px-8"
          onClick={() => signOut()}
        >
          Sign out
        </Button>
      </div>
      <SelectSeparator />
      <Label className="flex items-center w-full sm:w-fit gap-2 sm:ml-4 border px-4 py-4 rounded-md cursor-pointer hover:shadow-md">
        <Image
          src={"/assets/images/google-tasks.svg"}
          alt="logo"
          width={40}
          height={40}
        />
        <div className="flex items-center gap-2">
          <Checkbox
            checked={optimisticEnabled}
            onCheckedChange={handelCheckbox}
          />
          <p>Google Tasks Integration</p>
        </div>
      </Label>
    </div>
  );
};

export default UserInfo;
