"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { TbLogout, TbLogin2 } from "react-icons/tb";
import { cn } from "@/lib/utils";

const Header = () => {
  const { data: session, isPending, error } = authClient.useSession();

  const router = useRouter();
  const pathname = usePathname();

  const excludedPaths = ["/login", "/signup"];

  const logout = () => {
    authClient.signOut();
    router.push("/");
  };

  return (
    <header
      className={cn(
        "bg-card border-b mb-4 md:mb-6",
        excludedPaths.includes(pathname) && "hidden",
      )}
    >
      <div className="container xl:max-w-[1200px] 2xl:max-w-[1200px] mx-auto flex justify-between items-center px-2 py-1.5">
        <Link href="/">
          <h1>Logo</h1>
        </Link>

        {session ? (
          <button
            onClick={logout}
            className="inline-flex items-center gap-2 text-sm md:text-base px-4 py-1.5 rounded-md hover:bg-muted cursor-pointer"
          >
            <TbLogout />
            Log out
          </button>
        ) : (
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm md:text-base font-semibold px-4 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary-hover"
          >
            <TbLogin2 /> Log in
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
