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
    <>
      <ProfileClient
        name={session.user.name ?? ""}
        email={session.user.email ?? ""}
        initials={initials}
        memberSince={session.user.createdAt.toLocaleDateString("en-GB", {
          month: "long",
          year: "numeric",
        })}
        itemCount={itemCount}
      />
    </>
  );
};

export default ProfilePage;
