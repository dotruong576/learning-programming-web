import SignUp from "@/components/signup";
export default function SignUpPage() {
  return (
    <div className="flex h-full w-full flex-row">
      <div className="h-full w-3/5 bg-blue-100"></div>
      <div className="flex h-full w-2/5 items-center justify-center bg-white">
        <SignUp></SignUp>
      </div>
    </div>
  );
}
