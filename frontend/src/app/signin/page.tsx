import SignIn from "@/components/signin";
export default function SignInPage() {
  return (
    <div className="flex h-full w-full flex-row">
      <div className="h-full w-3/5 bg-blue-100"></div>
      <div className="flex h-full w-2/5 items-center justify-center bg-white">
        <SignIn></SignIn>
      </div>
    </div>
  );
}
