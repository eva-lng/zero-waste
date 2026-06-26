import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import FoodItem from "@/models/FoodItem";
import ProfileClient from "@/components/ProfileClient";

const ProfilePage = async () => {
  await dbConnect();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;
  const itemCount = await FoodItem.countDocuments({ user: userId });

  const initials = (session.user.name ?? "?")
    .split(" ")
    .map((s) => s[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="grid md:grid-cols-[35%_65%] gap-4 px-4">
      {/* avatar + identity */}
      <div className="flex flex-col items-center gap-2 py-4 md:py-6">
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary-light flex items-center justify-center text-lg md:text-xl font-medium text-primary-light-foreground shrink-0">
          {initials}
        </div>
        <div className="text-center">
          <p className="font-medium text-foreground">{session.user.name}</p>
          <p className="text-sm text-muted-foreground">{session.user.email}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {/* stats card */}
        <div className="bg-card border rounded-lg overflow-hidden">
          <div className="flex flex-col md:grid md:grid-cols-2">
            <div className="flex justify-between md:flex-col px-4 py-3">
              <p className="text-xs text-muted-foreground">Member since</p>
              <p className="text-sm text-foreground">
                {session.user.createdAt.toLocaleDateString("en-GB", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            {/* horizontal divider on mobile */}
            <div className="mx-4 border-t border-border md:hidden" />

            <div className="flex justify-between md:flex-col px-4 py-3">
              <p className="text-xs text-muted-foreground">Items tracked</p>
              <p className="text-sm text-foreground">{itemCount}</p>
            </div>
          </div>
        </div>

        <ProfileClient name={session.user.name ?? ""} />
      </div>
    </div>
  );
};

export default ProfilePage;
