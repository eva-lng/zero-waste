import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex flex-1 items-center justify-center py-8">
      <section className="w-full max-w-[400px]">
        <Link href="/">
          <h2 className="text-center text-xl md:text-2xl font-semibold mb-1">
            Zero Waste
          </h2>
        </Link>
        <p className="text-center text-xs md:text-sm mb-5">Welcome back</p>
        <LoginForm />
      </section>
    </div>
  );
};

export default LoginPage;
