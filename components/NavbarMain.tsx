"use client";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { usePathname } from "next/navigation";
import { BsPlus } from "react-icons/bs";

const NavbarMain = () => {
  const { data: session, isPending, error } = authClient.useSession();

  const pathname = usePathname();

  const monthParam = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`;

  if (isPending || !session) return null;

  return (
    <nav className="bottom-0 fixed w-full bg-card border-t">
      <div className="container mx-auto p-2">
        <ul className="flex justify-between items-center">
          <li>
            <Link
              href="/overview"
              className={`py-2 px-4 rounded-lg text-muted-foreground hover:bg-muted ${pathname === "/overview" && "text-primary"}`}
            >
              Overview
            </Link>
          </li>
          <li>
            <Link
              href="/inventory"
              className={`py-2 px-4 rounded-lg text-muted-foreground hover:bg-muted ${pathname === "/inventory" && "text-primary"}`}
            >
              Inventory
            </Link>
          </li>
          <li
            className={`hidden md:block ${pathname === "/inventory/add" && "md:hidden"}`}
          >
            <Link
              href="/inventory/add"
              aria-label="Add food item"
              className="flex items-center justify-center w-12 h-12 -mt-4 rounded-full bg-primary hover:bg-primary-hover text-primary-foreground shadow-lg transition-colors"
            >
              <BsPlus className="text-2xl" aria-hidden="true" />
            </Link>
          </li>
          <li>
            <Link
              href={`/stats?month=${monthParam}`}
              className={`py-2 px-4 rounded-lg text-muted-foreground hover:bg-muted ${pathname === "/stats" && "text-primary"}`}
            >
              Stats
            </Link>
          </li>
          <li>
            <Link
              href="/profile"
              className={`py-2 px-4 rounded-lg text-muted-foreground hover:bg-muted ${pathname === "/profile" && "text-primary"}`}
            >
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarMain;
