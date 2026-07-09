"use client";
import Link from "next/link";
import { TbAlertCircle } from "react-icons/tb";

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  console.log(error);

  return (
    <section className="flex flex-1 items-center justify-center py-8">
      <div className="bg-card border rounded-lg p-8 max-w-md w-full text-center shadow-sm">
        <div className="flex justify-center mb-4">
          <TbAlertCircle className="text-warning" size={48} strokeWidth={1.5} />
        </div>
        <h2 className="text-lg font-semibold text-foreground mb-2">
          Something went wrong
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
        <div className="flex justify-center gap-3">
          <button onClick={reset} className="btn-outline">
            Try again
          </button>
          <Link href="/overview" className="btn-primary">
            Go home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
