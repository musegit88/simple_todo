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

type UserInfoProps = {
  user: UserProps;
};

const UserInfo = ({ user }: UserInfoProps) => {
  const router = useRouter();
  const handelCheckbox = async () => {
    if (user.googleTaskIntegration) {
      await disableGoogleIntegration(user.id);
      router.refresh();
    } else {
      await enableGoogleIntegration(user.id);
      router.refresh();
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
          className="px-8"
          onClick={() => signOut()}
        >
          Sign out
        </Button>
      </div>
      <SelectSeparator />
      <Label className="flex items-center gap-2 ml-4">
        <Checkbox
          checked={user.googleTaskIntegration}
          onCheckedChange={handelCheckbox}
        />
        <p>Google Tasks Integration</p>
      </Label>
    </div>
  );
};

export default UserInfo;
