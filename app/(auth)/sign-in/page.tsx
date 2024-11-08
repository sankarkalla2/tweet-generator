import { signIn } from "@/auth";
import GitHubIcon from "@/components/icons/github-icon";
import GoogleIcon from "@/components/icons/google-icon";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SignInPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <Card className="w-[380px]">
        <CardHeader className="text-center">
          <h2 className="text-2xl font-bold">TICCO.st</h2>
          <CardTitle className="text-4xl">Welcome back</CardTitle>
          <CardDescription className="text-lg">
            Choose your sign in method
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <form
            action={async () => {
              "use server";
              console.log("signing in with github");
              await signIn("github");
            }}
          >
            <Button
              className="w-full flex items-center gap-x-2 py-6 text-lg font-bold rounded-xl"
              variant={"outline"}
            >
              <GitHubIcon />
              SignIn With Github
            </Button>
          </form>

          <Button
            variant="outline"
            className="w-full py-6 text-lg font-bold rounded-xl"
          >
            <GoogleIcon />
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;
