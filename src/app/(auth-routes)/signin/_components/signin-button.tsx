import { Button } from "@/components/ui/button";
import { signIn } from "../../../../auth";
import Image from "next/image";

const SignIn = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* SignIn with google */}
      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/" });
        }}
        className="w-full"
      >
        <Button
          variant="default"
          type="submit"
          className="flex items-center gap-4 px-10 w-full"
        >
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
        </Button>
      </form>

      {/* SignIn with Github */}
      {/* <form
        action={async () => {
          "use server";
          await signIn("github", { redirectTo: "/" });
        }}
        className="w-full"
      >
        <Button
          variant="default"
          type="submit"
          className="flex items-center gap-4 px-10 w-full"
        >
          <div className="flex items-center justify-start w-5 h-5">
            <Image
              src="/assets/images/github.svg"
              alt="D"
              width={100}
              height={100}
              className="w-8 h-8 "
            />
          </div>
          <p className="font-semibold">Continue with Github</p>
        </Button>
      </form> */}
    </div>
  );
};

export default SignIn;
