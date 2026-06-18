"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { signupSchema } from "@/lib/utils/schemas";
import { z } from "zod";
import SubmitButton from "./SubmitButton";

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
    <form onSubmit={handleSubmit} noValidate className="text-center">
      <div>
        <label htmlFor="email" className="block text-gray-700 font-bold mb-1.5">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="border rounded py-1 px-2"
          placeholder="example@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-invalid={!!fieldErrors.email}
          aria-describedby={fieldErrors.email ? "email-error" : undefined}
        />
      </div>
      <div className="mb-3">
        {fieldErrors.email && (
          <small id="email-error" aria-live="polite" className="text-red-500">
            {fieldErrors.email}
          </small>
        )}
      </div>
      <div>
        <label htmlFor="name" className="block text-gray-700 font-bold mb-1.5">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="border rounded py-1 px-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          aria-invalid={!!fieldErrors.name}
          aria-describedby={fieldErrors.name ? "name-error" : undefined}
        />
      </div>
      <div className="mb-3">
        {fieldErrors.name && (
          <small id="email-name" aria-live="polite" className="text-red-500">
            {fieldErrors.name}
          </small>
        )}
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-gray-700 font-bold mb-1.5"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="border rounded py-1 px-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-invalid={!!fieldErrors.password}
          aria-describedby={fieldErrors.password ? "password-error" : undefined}
        />
      </div>
      <div className="mb-3">
        {fieldErrors.password && (
          <small id="password-name" aria-live="polite" className="text-red-500">
            {fieldErrors.password}
          </small>
        )}
      </div>

      {error && (
        <div>
          <small aria-live="polite" className="text-red-500">
            {error}
          </small>
        </div>
      )}

      <SubmitButton
        loading={loading}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold cursor-pointer py-2 px-4 rounded-full focus:shadow-outline"
      >
        Sign up
      </SubmitButton>
    </form>
  );
};

export default SignupForm;
