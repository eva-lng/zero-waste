import Link from "next/link";
import { TbError404 } from "react-icons/tb";

const NotFoundPage = () => {
  return (
    <section className="flex flex-1 items-center justify-center py-8">
      <div className="bg-card border rounded-lg p-8 max-w-md w-full text-center shadow-sm">
        <div className="flex justify-center mb-4">
          <TbError404
            className="text-muted-foreground"
            size={48}
            strokeWidth={1.5}
          />
        </div>
        <h2 className="text-lg font-semibold text-foreground mb-2">
          Page not found
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/overview" className="btn-primary">
          Go home
        </Link>
      </div>
    </section>
  );
};

export default NotFoundPage;
