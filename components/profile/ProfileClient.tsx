"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import ChangeUsernameButton from "./ChangeUsernameButton";
import ChangePasswordButton from "./ChangePasswordButton";
import DeleteAccountButton from "./DeleteAccountButton";
import { TbLogout } from "react-icons/tb";

const ProfileClient = ({
  name,
  hasPassword,
}: {
  name: string;
  hasPassword: boolean;
}) => {
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
      <div className="card p-0 divide-y divide-border overflow-hidden">
        {/* change username */}
        <ChangeUsernameButton
          name={name}
          activeForm={activeForm}
          setActiveForm={setActiveForm}
        />

        {/* change password */}
        {hasPassword && (
          <ChangePasswordButton
            activeForm={activeForm}
            setActiveForm={setActiveForm}
          />
        )}

        {/* log out */}
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted transition-colors cursor-pointer"
        >
          <TbLogout aria-hidden="true" />
          Log out
        </button>
      </div>

      {/* delete account */}
      <DeleteAccountButton username={name} />
    </>
  );
};

export default ProfileClient;
