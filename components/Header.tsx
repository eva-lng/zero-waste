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
    <header className="bg-blue-400 px-8 py-2 flex items-center justify-between mb-5">
      <div>
        <Link href="/">Logo</Link>
      </div>

      <nav>
        <ul className="flex items-center gap-5">
          {session ? (
            <>
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button onClick={logout} className="underline cursor-pointer">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/signup">Get Started</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
