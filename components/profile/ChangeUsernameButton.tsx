"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { ProfileFormType } from "@/lib/utils/types";
import { z } from "zod";
import { changeUsernameSchema } from "@/lib/utils/schemas";
import SubmitButton from "../layout/SubmitButton";
import { TbChevronRight, TbUserEdit } from "react-icons/tb";

type ChangeUsernameButtonProps = {
  name: string;
  activeForm: ProfileFormType;
  setActiveForm: React.Dispatch<React.SetStateAction<ProfileFormType>>;
};

const ChangeUsernameButton = ({
  name,
  activeForm,
  setActiveForm,
}: ChangeUsernameButtonProps) => {
  const [fieldErrorsUsername, setFieldErrorsUsername] = useState<
    string | undefined
  >("");
  const [username, setUsername] = useState(name);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleUsernameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrorsUsername("");
    setError(null);

    const validated = changeUsernameSchema.safeParse({ username });

    if (!validated.success) {
      const flattened = z.flattenError(validated.error);
      setFieldErrorsUsername(flattened.fieldErrors.username?.[0]);
      return;
    }

    await authClient.updateUser(
      {
        name: username,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          setLoading(false);
          setActiveForm(null);
          router.refresh();
        },
        onError: (ctx) => {
          setError(ctx.error.message);
          setLoading(false);
        },
      },
    );
  };

  return (
    <>
      <button
        onClick={() => {
          setActiveForm(activeForm === "username" ? null : "username");
          setError(null);
        }}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors cursor-pointer"
      >
        <TbUserEdit aria-hidden="true" />
        <span className="text-sm">Change username</span>
        <TbChevronRight
          className="hidden md:block ml-auto text-muted-foreground text-sm"
          aria-hidden="true"
        />
      </button>

      {activeForm === "username" && (
        <div className="px-4 py-3">
          <form
            onSubmit={handleUsernameSubmit}
            noValidate
            className="flex flex-col gap-2"
          >
            <div>
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoFocus
                placeholder="New username"
                // className="w-full border border-primary rounded-md px-3 py-1.5 text-sm bg-card focus:outline-none focus:ring-1 focus:ring-primary"
                className="input py-1.5"
                aria-invalid={!!fieldErrorsUsername}
                aria-describedby={
                  fieldErrorsUsername ? "username-error" : undefined
                }
              />
              {fieldErrorsUsername && (
                <small
                  id="username-error"
                  aria-live="polite"
                  className="block mt-0.5 text-xs text-destructive text-right"
                >
                  {fieldErrorsUsername}
                </small>
              )}
            </div>
            {error && (
              <small
                aria-live="polite"
                className="block text-xs text-destructive text-right"
              >
                {error}
              </small>
            )}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setActiveForm(null);
                  setUsername(name);
                  setFieldErrorsUsername("");
                  setError(null);
                }}
                disabled={loading}
                className="btn-outline px-3 p-1.5 text-xs"
              >
                Cancel
              </button>
              <SubmitButton
                className="btn-primary px-3 p-1.5 text-xs"
                pendingText="Saving..."
                loading={loading}
              >
                Save
              </SubmitButton>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ChangeUsernameButton;
