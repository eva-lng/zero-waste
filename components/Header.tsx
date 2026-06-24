"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const Header = () => {
  const { data: session, isPending, error } = authClient.useSession();

  const router = useRouter();

  const logout = () => {
    authClient.signOut();
    router.push("/");
  };

  return (
    <header className="bg-card border-b">
      <div className="container mx-auto flex justify-between items-center p-2">
        <Link href="/">
          <h1>Logo</h1>
        </Link>

        {session ? (
          <button onClick={logout} className="cursor-pointer">
            Logout
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/login">Login</Link>
            <Link href="/signup">Get Started</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
