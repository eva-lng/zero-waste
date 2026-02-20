"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { data, error } = await authClient.signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onRequest: (ctx) => {
          setLoading(true);
        },
        onSuccess: (ctx) => {
          router.push("/dashboard");
        },
        onError: (ctx) => {
          setError(ctx.error.message);
          setLoading(false);
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="text-center">
      <div className="mb-3">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-1.5">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="border rounded py-1 px-2"
          placeholder="example@domain.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-1.5">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="border rounded py-1 px-2"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
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
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {error && <p className="text-red-600">{error}</p>}

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold cursor-pointer py-2 px-4 rounded-full focus:shadow-outline"
        disabled={loading}
      >
        Sign up
      </button>
    </form>
  );
};

export default SignupForm;
