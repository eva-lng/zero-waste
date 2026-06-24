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
  const [fieldErrors, setFieldErrors] = useState<{
    password?: string;
    username?: string;
  }>({});
  const [username, setUsername] = useState(name);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const logout = () => {
    authClient.signOut();
    router.push("/");
  };

  const handleUsernameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setError(null);

    const validated = changeUsernameSchema.safeParse({ username });

    if (!validated.success) {
      const flattened = z.flattenError(validated.error);
      setFieldErrors({
        username: flattened.fieldErrors.username?.[0],
      });
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
              onClick={() =>
                setActiveForm(activeForm === "username" ? null : "username")
              }
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
                      aria-invalid={!!fieldErrors.username}
                      aria-describedby={
                        fieldErrors.username ? "username-" : undefined
                      }
                    />
                    {fieldErrors.username && (
                      <small
                        id="username-error"
                        aria-live="polite"
                        className="block mt-0.5 text-xs text-destructive text-right"
                      >
                        {fieldErrors.username}
                      </small>
                    )}
                  </div>
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveForm(null);
                        setUsername(name);
                        setFieldErrors({});
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
              onClick={() =>
                setActiveForm(activeForm === "password" ? null : "password")
              }
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
                <form className="flex flex-col gap-2">
                  <input
                    type="password"
                    placeholder="Current password"
                    autoFocus
                    className="w-full border border-primary rounded-md px-3 py-1.5 text-sm bg-card focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <div className="flex flex-col gap-2 md:flex-row">
                    <input
                      type="password"
                      placeholder="New password"
                      className="flex-1 border border-primary rounded-md px-3 py-1.5 text-sm bg-card focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      className="flex-1 border border-primary rounded-md px-3 py-1.5 text-sm bg-card focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveForm(null)}
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
