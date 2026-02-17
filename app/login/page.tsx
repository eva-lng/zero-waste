import Link from "next/link";
import LoginForm from "@/components/LoginForm";

const LoginPage = () => {
  return (
    <>
      <h2 className="text-3xl text-center m-3">Log in to your account</h2>
      <p className="text-center mb-5">
        Don't have an account?{" "}
        <Link href="/signup" className="text-blue-700">
          Sign Up
        </Link>
      </p>
      <LoginForm />
    </>
  );
};

export default LoginPage;
