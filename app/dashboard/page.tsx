import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <h2 className="text-3xl text-center m-3">Dashboard</h2>
      <p className="text-center">
        Welcome {session.user.name ?? session.user.email.split("@")[0]}
      </p>
      <div className="text-center">
        <Link href="/dashboard/add">Add Food</Link>
      </div>
    </>
  );
};

export default DashboardPage;
