import Link from "next/link";
import SignupForm from "@/components/SignupForm";

const SignupPage = () => {
  return (
    <>
      <h2 className="text-3xl text-center">Sign up</h2>
      <p className="text-center">
        Have an account?{" "}
        <Link href="/login" className="text-blue-700">
          Log in now
        </Link>
      </p>
      <SignupForm />
    </>
  );
};

export default SignupPage;
