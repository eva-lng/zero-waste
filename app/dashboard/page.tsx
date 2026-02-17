import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

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
    </>
  );
};

export default DashboardPage;
