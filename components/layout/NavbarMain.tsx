"use client";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { usePathname } from "next/navigation";
import {
  TbPlus,
  TbLayoutDashboard,
  TbSalad,
  TbChartPie,
  TbUser,
} from "react-icons/tb";
import { cn } from "@/lib/utils";

const NavbarMain = () => {
  const { data: session, isPending, error } = authClient.useSession();

  const pathname = usePathname();

  // const monthParam = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`;

  if (isPending || !session) return null;

  return (
    <nav className="bottom-0 fixed w-full bg-card border-t shadow-sm">
      <div className="container xl:max-w-[1200px] 2xl:max-w-[1200px] mx-auto px-2">
        <ul className="flex justify-between items-center">
          <li>
            <Link
              href="/overview"
              className="flex flex-col items-center rounded-md px-3 py-1.5 transition-colors text-muted-foreground hover:bg-muted"
            >
              <span
                className={cn(
                  "rounded-full px-3 py-1",
                  pathname === "/overview" &&
                    "bg-primary-light text-primary-light-foreground",
                )}
              >
                <TbLayoutDashboard
                  className="text-xl md:text-2xl"
                  aria-hidden="true"
                />
              </span>
              <span
                className={cn(
                  "mt-1 text-xs md:text-sm",
                  pathname === "/overview" && "text-primary-light-foreground",
                )}
              >
                Overview
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/inventory"
              className="flex flex-col items-center rounded-md px-3 py-1.5 transition-colors text-muted-foreground hover:bg-muted"
            >
              <span
                className={cn(
                  "rounded-full px-3 py-1",
                  pathname === "/inventory" &&
                    "bg-primary-light text-primary-light-foreground",
                )}
              >
                <TbSalad className="text-xl md:text-2xl" aria-hidden="true" />
              </span>
              <span
                className={cn(
                  "mt-1 text-xs md:text-sm",
                  pathname === "/inventory" && "text-primary-light-foreground",
                )}
              >
                Inventory
              </span>
            </Link>
          </li>
          <li
            className={cn(
              "hidden md:block",
              pathname === "/inventory/add" && "md:hidden",
            )}
          >
            <Link
              href="/inventory/add"
              aria-label="Add food item"
              className="flex items-center justify-center w-12 h-12  rounded-full bg-primary hover:bg-primary-hover text-primary-foreground shadow-xl transition-colors"
            >
              <TbPlus size={18} strokeWidth={3} aria-hidden="true" />
            </Link>
          </li>
          <li>
            <Link
              href="/stats"
              className="flex flex-col items-center rounded-md px-3 py-1.5 transition-colors text-muted-foreground hover:bg-muted"
            >
              <span
                className={cn(
                  "rounded-full px-3 py-1",
                  pathname === "/stats" &&
                    "bg-primary-light text-primary-light-foreground",
                )}
              >
                <TbChartPie
                  className="text-xl md:text-2xl"
                  aria-hidden="true"
                />
              </span>
              <span
                className={cn(
                  "mt-1 text-xs md:text-sm",
                  pathname === "/stats" && "text-primary-light-foreground",
                )}
              >
                Stats
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/profile"
              className="flex flex-col items-center rounded-md px-3 py-1.5 transition-colors text-muted-foreground hover:bg-muted"
            >
              <span
                className={cn(
                  "rounded-full px-3 py-1",
                  pathname === "/profile" &&
                    "bg-primary-light text-primary-light-foreground",
                )}
              >
                <TbUser className="text-xl md:text-2xl" aria-hidden="true" />
              </span>
              <span
                className={cn(
                  "mt-1 text-xs md:text-sm",
                  pathname === "/profile" && "text-primary-light-foreground",
                )}
              >
                Profile
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarMain;
