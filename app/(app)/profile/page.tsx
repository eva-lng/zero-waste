import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import FoodItem from "@/models/FoodItem";
import ProfileClient from "@/components/profile/ProfileClient";

const ProfilePage = async () => {
  await dbConnect();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;

  const accounts = await auth.api.listUserAccounts({
    headers: await headers(),
  });
  const hasPassword = accounts.some((el) => el.providerId === "credential");

  const itemCount = await FoodItem.countDocuments({ user: userId });

  const initials = (session.user.name ?? "?")
    .split(" ")
    .map((s) => s[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      <h2 className="sr-only">Profile</h2>
      <div className="grid md:grid-cols-[35%_65%] gap-6 md:gap-0">
        {/* avatar + identity */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center justify-center shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary-light text-xl md:text-2xl font-medium text-primary-light-foreground">
            {initials}
          </div>
          <div className="text-center">
            <p className="font-semibold text-[15px] md:text-base">
              {session.user.name}
            </p>
            <p className="text-xs md:text-sm text-muted-foreground">
              {session.user.email}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {/* stats card */}
          <div className="card grid md:grid-cols-2 gap-2 overflow-hidden">
            <div className="flex justify-between items-center md:flex-col md:items-start">
              <span className="text-xs text-muted-foreground">
                Member since
              </span>
              <span className="text-sm">
                {session.user.createdAt.toLocaleDateString("en-GB", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            {/* horizontal divider on mobile */}
            <div className="border-t border-border md:hidden" />
            <div className="flex justify-between items-center md:flex-col md:items-start">
              <span className="text-xs text-muted-foreground">
                Items tracked
              </span>
              <span className="text-sm">{itemCount}</span>
            </div>
          </div>

          <ProfileClient
            name={session.user.name ?? ""}
            hasPassword={hasPassword}
          />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
