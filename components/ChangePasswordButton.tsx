"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { ProfileFormType } from "@/lib/utils/types";
import { z } from "zod";
import { changePasswordSchema } from "@/lib/utils/schemas";
import SubmitButton from "./SubmitButton";

type ChangePasswordButtonProps = {
  activeForm: ProfileFormType;
  setActiveForm: React.Dispatch<React.SetStateAction<ProfileFormType>>;
};

const ChangePasswordButton = ({
  activeForm,
  setActiveForm,
}: ChangePasswordButtonProps) => {
  const [fieldErrorsPassword, setFieldErrorsPassword] = useState<{
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});
  const [password, setPassword] = useState<{
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }>({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrorsPassword({});
    setError(null);

    const validated = changePasswordSchema.safeParse({
      currentPassword: password.currentPassword,
      newPassword: password.newPassword,
      confirmPassword: password.confirmPassword,
    });

    if (!validated.success) {
      const flattened = z.flattenError(validated.error);
      setFieldErrorsPassword({
        currentPassword: flattened.fieldErrors.currentPassword?.[0],
        newPassword: flattened.fieldErrors.newPassword?.[0],
        confirmPassword: flattened.fieldErrors.confirmPassword?.[0],
      });
      return;
    }

    await authClient.changePassword(
      {
        newPassword: password.newPassword,
        currentPassword: password.currentPassword,
        revokeOtherSessions: true,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          setLoading(false);
          setPassword({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
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
      <div className="border-b">
        <button
          onClick={() => {
            setActiveForm(activeForm === "password" ? null : "password");
            setError(null);
          }}
          className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground" aria-hidden="true">
              🔒
            </span>
            <span className="text-sm text-foreground">Change password</span>
          </div>
          <span className="text-muted-foreground text-sm" aria-hidden="true">
            ›
          </span>
        </button>

        {activeForm === "password" && (
          <div className="px-4 py-3 bg-primary-light/20 border-t">
            <form
              onSubmit={handlePasswordSubmit}
              noValidate
              className="flex flex-col gap-2"
            >
              <div>
                <input
                  type="password"
                  name="currentPassword"
                  value={password.currentPassword}
                  onChange={(e) =>
                    setPassword((prev) => ({
                      ...prev,
                      currentPassword: e.target.value,
                    }))
                  }
                  required
                  placeholder="Current password"
                  autoFocus
                  className="w-full border border-primary rounded-md px-3 py-1.5 text-sm bg-card focus:outline-none focus:ring-1 focus:ring-primary"
                  aria-invalid={!!fieldErrorsPassword.currentPassword}
                  aria-describedby={
                    fieldErrorsPassword.currentPassword
                      ? "current-password-error"
                      : undefined
                  }
                />
                {fieldErrorsPassword.currentPassword && (
                  <small
                    id="current-password-error"
                    aria-live="polite"
                    className="block mt-0.5 text-xs text-destructive text-right"
                  >
                    {fieldErrorsPassword.currentPassword}
                  </small>
                )}
                {error && (
                  <small
                    aria-live="polite"
                    className="block mt-0.5 text-xs text-destructive text-right"
                  >
                    {error}
                  </small>
                )}
              </div>
              <div className="flex flex-col gap-2 md:flex-row">
                <div className="flex-1">
                  <input
                    type="password"
                    name="newPassword"
                    value={password.newPassword}
                    onChange={(e) =>
                      setPassword((prev) => ({
                        ...prev,
                        newPassword: e.target.value,
                      }))
                    }
                    required
                    placeholder="New password"
                    className="w-full border border-primary rounded-md px-3 py-1.5 text-sm bg-card focus:outline-none focus:ring-1 focus:ring-primary"
                    aria-invalid={!!fieldErrorsPassword.newPassword}
                    aria-describedby={
                      fieldErrorsPassword.newPassword
                        ? "new-password-error"
                        : undefined
                    }
                  />
                  {fieldErrorsPassword.newPassword && (
                    <small
                      id="new-password-error"
                      aria-live="polite"
                      className="block mt-0.5 text-xs text-destructive text-right"
                    >
                      {fieldErrorsPassword.newPassword}
                    </small>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={password.confirmPassword}
                    onChange={(e) =>
                      setPassword((prev) => ({
                        ...prev,
                        confirmPassword: e.target.value,
                      }))
                    }
                    required
                    placeholder="Confirm new password"
                    className="w-full border border-primary rounded-md px-3 py-1.5 text-sm bg-card focus:outline-none focus:ring-1 focus:ring-primary"
                    aria-invalid={!!fieldErrorsPassword.confirmPassword}
                    aria-describedby={
                      fieldErrorsPassword.confirmPassword
                        ? "confirm-password-error"
                        : undefined
                    }
                  />
                  {fieldErrorsPassword.confirmPassword && (
                    <small
                      id="confirm-password-error"
                      aria-live="polite"
                      className="block mt-0.5 text-xs text-destructive text-right"
                    >
                      {fieldErrorsPassword.confirmPassword}
                    </small>
                  )}
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setActiveForm(null);
                    setPassword({
                      currentPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                    });
                    setFieldErrorsPassword({});
                    setError(null);
                  }}
                  disabled={loading}
                  className="btn-outline"
                >
                  Cancel
                </button>
                <SubmitButton
                  className="btn-primary"
                  loading={loading}
                  pendingText="Saving..."
                >
                  Save
                </SubmitButton>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default ChangePasswordButton;
