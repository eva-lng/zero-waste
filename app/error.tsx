"use client";
import Link from "next/link";
import { FiAlertCircle } from "react-icons/fi";

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  console.log(error);

  return (
    <section className="bg-blue-50 min-h-screen grow">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-24 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <div className="flex justify-center">
            <FiAlertCircle className="text-yellow-400 text-8xl fa-5x" />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold mt-4 mb-2">
              Something Went Wrong
            </h1>
            <p className="text-gray-500 text-xl mb-10">{error.message}</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => reset()}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-6 rounded cursor-pointer"
              >
                Try Again
              </button>

              <Link
                href="/"
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-6 rounded"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="grow"></div>
    </section>
  );
};

export default ErrorPage;
