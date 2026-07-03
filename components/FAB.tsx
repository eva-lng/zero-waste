"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TbPlus } from "react-icons/tb";

const FAB = () => {
  const pathname = usePathname();

  return (
    <div
      className={`fixed bottom-18 left-0 w-full pointer-events-none md:hidden ${pathname === "/inventory/add" && "hidden"}`}
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
