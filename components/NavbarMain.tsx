"use client";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const NavbarMain = () => {
  const { data: session, isPending, error } = authClient.useSession();

  const monthParam = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`;

  if (isPending || !session) return null;

  return (
    <nav className="bottom-0 fixed w-full bg-card border-t">
      <div className="container mx-auto p-2">
        <ul className="flex justify-between items-center">
          <li>
            <Link href="/overview">Overview</Link>
          </li>
          <li>
            <Link href="/inventory">Inventory</Link>
          </li>
          <li>
            <Link href={`/stats?month=${monthParam}`}>Stats</Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarMain;
