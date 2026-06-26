"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { ProfileFormType } from "@/lib/utils/types";
import { z } from "zod";
import { changeUsernameSchema } from "@/lib/utils/schemas";
import SubmitButton from "./SubmitButton";

type ChangeUsernameSectionProps = {
  name: string;
  activeForm: ProfileFormType;
  setActiveForm: React.Dispatch<React.SetStateAction<ProfileFormType>>;
};

const ChangeUsernameSection = ({
  name,
  activeForm,
  setActiveForm,
}: ChangeUsernameSectionProps) => {
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
    <div className="border-b">
      <button
        onClick={() => {
          setActiveForm(activeForm === "username" ? null : "username");
          setError(null);
        }}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted transition-colors"
      >
        <div className="flex items-center gap-3">
          {/* replace with icon */}
          <span className="text-muted-foreground" aria-hidden="true">
            👤
          </span>
          <span className="text-sm text-foreground">Change username</span>
        </div>
        <span className="text-muted-foreground text-sm" aria-hidden="true">
          ›
        </span>
      </button>

      {activeForm === "username" && (
        <div className="px-4 py-3 bg-primary-light/20 border-t">
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
                className="w-full border border-primary rounded-md px-3 py-1.5 text-sm bg-card focus:outline-none focus:ring-1 focus:ring-primary"
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
                className="text-xs text-muted-foreground"
              >
                Cancel
              </button>
              <SubmitButton
                className="text-xs bg-primary enabled:hover:bg-primary-hover text-primary-foreground rounded-md px-3 py-1.5 transition-colors disabled:opacity-40"
                pendingText="Saving..."
                loading={loading}
              >
                Save
              </SubmitButton>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChangeUsernameSection;
