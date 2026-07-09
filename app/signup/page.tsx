import Link from "next/link";
import SignupForm from "@/components/auth/SignupForm";

const SignupPage = () => {
  return (
    <div className="flex flex-1 items-center justify-center py-8">
      <section className="w-full max-w-[400px]">
        <Link href="/">
          <h2 className="text-center text-xl md:text-2xl font-semibold mb-1">
            Zero Waste
          </h2>
        </Link>
        <p className="text-center text-xs md:text-sm mb-5">
          Create your account
        </p>
        <SignupForm />
      </section>
    </div>
  );
};

export default SignupPage;
