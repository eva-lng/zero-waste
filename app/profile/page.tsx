import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import FoodItem from "@/models/FoodItem";

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

  return (
    <section>
      <div className="text-center">
        <h2>{session.user.name}</h2>
        <p>{session.user.email}</p>
      </div>

      <div>
        <div className="bg-card border rounded-lg p-2">
          <div className="flex justify-between">
            <span>Member since</span>
            <span>
              {session.user.createdAt.toLocaleDateString("en-GB", {
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Items tracked</span>
            <span>{itemCount}</span>
          </div>
        </div>

        <div className="bg-card border rounded-lg p-2">
          <button>Change password</button>
          <button>Log out</button>
        </div>

        <button>Delete account</button>
      </div>
    </section>
  );
};

export default ProfilePage;
