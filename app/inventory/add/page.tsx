import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import FoodAddForm from "@/components/FoodAddForm";

const AddFoodPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <FoodAddForm />
    </>
  );
};

export default AddFoodPage;
