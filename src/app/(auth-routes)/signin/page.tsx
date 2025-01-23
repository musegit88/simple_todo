import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SignIn from "./_components/signin-button";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { SelectSeparator } from "@/components/ui/select";

const SignInPage = () => {
  return (
    <Card>
      <CardHeader className="text-center border-b-2">
        <CardTitle className=" text-lg font-light">
          Sign in to your Todo account
        </CardTitle>
      </CardHeader>
      <CardContent className="w-96 flex flex-col gap-4">
        {/* <div className="mt-10 flex flex-col gap-4">
          <Input placeholder="your@email.com" />
          <Button variant="outline">
            <Mail className="mr-2 w-5 h-5" />
            Continue with Email
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <div className="grow basis-0 border-b border-input" />
          <p className="text-sm">OR</p>
          <div className="grow basis-0 border-b border-input" />
        </div> */}
        <div className="mt-10">
          <SignIn />
        </div>
      </CardContent>
    </Card>
  );
};

export default SignInPage;
