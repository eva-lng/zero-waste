"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsPlus } from "react-icons/bs";

const FAB = () => {
  const pathname = usePathname();

  return (
    <div
      className={`fixed bottom-16 left-0 w-full pointer-events-none md:hidden ${pathname === "/inventory/add" && "hidden"}`}
    >
      <div className="container mx-auto flex justify-end px-4 sm:px-2">
        <Link
          href="/inventory/add"
          aria-label="Add new food item"
          className="pointer-events-auto bg-primary hover:bg-primary-hover text-primary-foreground rounded-full shadow-lg transition-colors p-2"
        >
          <BsPlus aria-hidden="true" className="text-2xl" />
        </Link>
      </div>
    </div>
  );
};

export default FAB;
