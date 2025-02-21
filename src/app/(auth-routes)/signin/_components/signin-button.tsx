"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Loader } from "lucide-react";
import { googleSignIn } from "@/app/_actions/auth.actions";
import { useFormStatus } from "react-dom";

const SignIn = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* SignIn with google */}
      <form
        action={async () => {
          googleSignIn();
        }}
        className="w-full"
      >
        <SubmitButton />
      </form>
    </div>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      variant="default"
      type="submit"
      className="flex items-center gap-4 px-10 w-full"
      disabled={pending}
    >
      {pending ? (
        <div className="flex justify-center">
          <Loader className="animate-spin" />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-start w-5 h-5">
            <Image
              src="/assets/images/google.svg"
              alt="G"
              width={100}
              height={100}
              className="w-8 h-8"
            />
          </div>
          <p className="font-semibold">Continue with Google</p>
        </>
      )}
    </Button>
  );
};
export default SignIn;
