"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import SubmitButton from "./SubmitButton";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { data, error } = await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          router.push("/overview");
        },
        onError: (ctx) => {
          setError(ctx.error.message);
          setLoading(false);
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="card">
        {/* email */}
        <div className="mb-3">
          <label htmlFor="email" className="block mb-1 text-xs font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="input"
            placeholder="example@domain.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* password */}
        <div>
          <label htmlFor="password" className="block mb-1 text-xs font-medium">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="input"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <small
            aria-live="polite"
            className="block mt-1 text-destructive text-xs text-end"
          >
            {error}
          </small>
        )}

        <SubmitButton
          loading={loading}
          className="btn-primary w-full inline-flex justify-center items-center my-4"
        >
          Log in
        </SubmitButton>

        <p className="text-xs text-center">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-primary hover:text-primary-hover font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
