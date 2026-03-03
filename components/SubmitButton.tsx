"use client";
import React from "react";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
};

const SubmitButton = ({ children, className, loading }: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  const isLoading = loading ?? pending;

  return (
    <button type="submit" disabled={isLoading} className={className}>
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default SubmitButton;
