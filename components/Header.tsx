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

  const monthParam = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`;

  return (
    <header className="bg-card lg:mb-4 border-border border-b">
      <div className="container mx-auto flex justify-between items-center p-2">
        <div>
          <Link href="/">
            <h1>Logo</h1>
          </Link>
        </div>

        <nav>
          <ul className="flex items-center gap-5">
            {session ? (
              <>
                <li>
                  <Link href="/overview">Overview</Link>
                </li>
                <li>
                  <Link href={`/stats?month=${monthParam}`}>Stats</Link>
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
      </div>
    </header>
  );
};

export default Header;
