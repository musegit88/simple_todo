import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SignIn from "./_components/signin-button";

const SignInPage = () => {
  return (
    <Card>
      <CardHeader className="text-center border-b-2">
        <CardTitle className=" text-lg font-light">
          Sign in to your Todo account
        </CardTitle>
      </CardHeader>
      <CardContent className="w-96 flex flex-col gap-4">
        <div className="mt-10">
          <SignIn />
        </div>
      </CardContent>
    </Card>
  );
};

export default SignInPage;
