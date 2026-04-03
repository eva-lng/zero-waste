"use client";
import React from "react";
import { useFormStatus } from "react-dom";

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
    <button type="submit" disabled={isLoading} className={className}>
      {isLoading ? pendingText : children}
    </button>
  );
};

export default SubmitButton;
