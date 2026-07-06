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
    <section className="max-w-[680px] mx-auto">
      <h2 className="text-base md:text-lg font-medium mb-4">Add food item</h2>
      <FoodAddForm />
    </section>
  );
};

export default AddFoodPage;
