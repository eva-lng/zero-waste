"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { signupSchema } from "@/lib/utils/schemas";
import { z } from "zod";
import SubmitButton from "./SubmitButton";
import { cn } from "@/lib/utils";

const SignupForm = () => {
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
    name?: string;
  }>({});
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setError(null);

    const validated = signupSchema.safeParse({ email, password, name });

    if (!validated.success) {
      const flattened = z.flattenError(validated.error);
      setFieldErrors({
        email: flattened.fieldErrors.email?.[0],
        password: flattened.fieldErrors.password?.[0],
        name: flattened.fieldErrors.name?.[0],
      });
      return;
    }

    const { data, error } = await authClient.signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          router.push("/overview");
        },
        onError: (ctx) => {
          if (ctx.error.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
            setFieldErrors((prev) => ({ ...prev, email: ctx.error.message }));
          } else {
            setError(ctx.error.message);
          }
          setLoading(false);
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="card">
        {/* name */}
        <div className="mb-3">
          <label htmlFor="name" className="block mb-1 text-xs font-medium">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className={cn(
              "input",
              fieldErrors?.name &&
                "border-destructive focus-visible:ring-destructive",
            )}
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            aria-invalid={!!fieldErrors.name}
            aria-describedby={fieldErrors.name ? "name-error" : undefined}
          />
          {fieldErrors.name && (
            <small
              id="name-error"
              aria-live="polite"
              className="block mt-1 text-destructive text-xs text-end"
            >
              {fieldErrors.name}
            </small>
          )}
        </div>

        {/* email */}
        <div className="mb-3">
          <label htmlFor="email" className="block mb-1 text-xs font-medium">
            Email address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className={cn(
              "input",
              fieldErrors?.email &&
                "border-destructive focus-visible:ring-destructive",
            )}
            placeholder="example@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
          />
          {fieldErrors.email && (
            <small
              id="email-error"
              aria-live="polite"
              className="block mt-1 text-destructive text-xs text-end"
            >
              {fieldErrors.email}
            </small>
          )}
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
            className={cn(
              "input",
              fieldErrors?.password &&
                "border-destructive focus-visible:ring-destructive",
            )}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-invalid={!!fieldErrors.password}
            aria-describedby={
              fieldErrors.password ? "password-error" : undefined
            }
          />
          {fieldErrors.password ? (
            <small
              id="password-error"
              aria-live="polite"
              className="block mt-1 text-destructive text-xs text-end"
            >
              {fieldErrors.password}
            </small>
          ) : (
            <small className="block mt-1 text-muted-foreground text-xs">
              Min. 8 characters, one uppercase and one number
            </small>
          )}
        </div>

        {error && (
          <small
            aria-live="polite"
            className="block mt-2 text-destructive text-xs text-center"
          >
            {error}
          </small>
        )}

        <SubmitButton
          loading={loading}
          className="btn-primary w-full inline-flex justify-center items-center my-4"
        >
          Sign up
        </SubmitButton>

        <p className="text-xs text-center">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary hover:text-primary-hover font-medium"
          >
            Log in
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignupForm;
