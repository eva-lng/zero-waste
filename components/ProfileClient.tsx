"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import ChangeUsernameSection from "./ChangeUsernameSection";
import ChangePasswordSection from "./ChangePasswordSection";

const ProfileClient = ({ name }: { name: string }) => {
  const [activeForm, setActiveForm] = useState<"username" | "password" | null>(
    null,
  );

  const router = useRouter();

  const logout = () => {
    authClient.signOut();
    router.push("/");
  };

  return (
    <>
      {/* account actions card */}
      <div className="bg-card border rounded-lg overflow-hidden">
        {/* change username */}
        <ChangeUsernameSection
          name={name}
          activeForm={activeForm}
          setActiveForm={setActiveForm}
        />

        {/* change password */}
        <ChangePasswordSection
          activeForm={activeForm}
          setActiveForm={setActiveForm}
        />

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
    </>
  );
};

export default ProfileClient;
