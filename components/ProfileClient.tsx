"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { z } from "zod";
import {
  changeUsernameSchema,
  changePasswordSchema,
} from "@/lib/utils/schemas";

type Props = {
  name: string;
  email: string;
  initials: string;
  memberSince: string;
  itemCount: number;
};

const ProfileClient = ({
  name,
  email,
  initials,
  memberSince,
  itemCount,
}: Props) => {
  const [activeForm, setActiveForm] = useState<"username" | "password" | null>(
    null,
  );
  const [fieldErrorsUsername, setFieldErrorsUsername] = useState<
    string | undefined
  >("");
  const [fieldErrorsPassword, setFieldErrorsPassword] = useState<{
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});
  const [username, setUsername] = useState(name);
  const [password, setPassword] = useState<{
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }>({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const logout = () => {
    authClient.signOut();
    router.push("/");
  };

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
    <div className="grid md:grid-cols-[35%_65%] gap-4 px-4">
      {/* avatar + identity */}
      <div className="flex flex-col items-center gap-2 py-4 md:py-6">
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary-light flex items-center justify-center text-lg md:text-xl font-medium text-primary-light-foreground shrink-0">
          {initials}
        </div>
        <div className="text-center">
          <p className="font-medium text-foreground">{name}</p>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {/* stats card */}
        <div className="bg-card border rounded-lg overflow-hidden">
          <div className="flex flex-col md:grid md:grid-cols-2">
            <div className="flex justify-between md:flex-col px-4 py-3">
              <p className="text-xs text-muted-foreground">Member since</p>
              <p className="text-sm text-foreground">{memberSince}</p>
            </div>

            {/* horizontal divider on mobile */}
            <div className="mx-4 border-t border-border md:hidden" />

            <div className="flex justify-between md:flex-col px-4 py-3">
              <p className="text-xs text-muted-foreground">Items tracked</p>
              <p className="text-sm text-foreground">{itemCount}</p>
            </div>
          </div>
        </div>

        {/* account actions card */}
        <div className="bg-card border rounded-lg overflow-hidden">
          {/* change username */}
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
              <span
                className="text-muted-foreground text-sm"
                aria-hidden="true"
              >
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
                      className="text-xs text-muted-foreground"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="text-xs bg-primary hover:bg-primary-hover text-primary-foreground rounded-md px-3 py-1.5 transition-colors"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* change password */}
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
              <span
                className="text-muted-foreground text-sm"
                aria-hidden="true"
              >
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
                      className="text-xs text-muted-foreground"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="text-xs bg-primary hover:bg-primary-hover text-primary-foreground rounded-md px-3 py-1.5 transition-colors"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* log out */}
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors"
          >
            <span className="text-muted-foreground" aria-hidden="true">
              →
            </span>
            Log out
          </button>
        </div>

        {/* delete account */}
        <button className="w-full md:w-auto md:self-start bg-destructive-light text-destructive-light-foreground rounded-lg px-4 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity">
          Delete account
        </button>
      </div>
    </div>
  );
};

export default ProfileClient;
