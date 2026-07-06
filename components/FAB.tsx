"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TbPlus } from "react-icons/tb";
import { cn } from "@/lib/utils";

const FAB = () => {
  const pathname = usePathname();
  const excludedPaths = ["/inventory/add", "/login", "/signup"];

  return (
    <div
      className={cn(
        "fixed bottom-18 left-0 w-full pointer-events-none md:hidden",
        excludedPaths.includes(pathname) && "hidden",
      )}
    >
      <div className="container mx-auto flex justify-end px-5">
        <Link
          href="/inventory/add"
          aria-label="Add new food item"
          className="pointer-events-auto bg-primary hover:bg-primary-hover text-primary-foreground rounded-full shadow-xl transition-colors p-3"
        >
          <TbPlus aria-hidden="true" size={18} strokeWidth={3} />
        </Link>
      </div>
    </div>
  );
};

export default FAB;
