"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { Spinner } from "@/components/ui/spinner";

type SubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
  pendingText?: React.ReactNode;
};

const SubmitButton = ({
  children,
  className,
  loading,
  pendingText = "Loading...",
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  const isLoading = loading ?? pending;
  // const isLoading = loading !== null && loading !== undefined ? loading : pending;

  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`${className} inline-flex items-center gap-1 cursor-pointer disabled:cursor-not-allowed`}
    >
      {isLoading && <Spinner />} {isLoading ? pendingText : children}
    </button>
  );
};

export default SubmitButton;
