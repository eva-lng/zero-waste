import deleteFood from "@/app/actions/deleteFood";
import SubmitButton from "./SubmitButton";
import { FiTrash2 } from "react-icons/fi";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const FoodDeleteButton = ({
  foodId,
  name,
  compact,
}: {
  foodId: string;
  name: string;
  compact: boolean;
}) => {
  const deleteFoodById = deleteFood.bind(null, foodId);

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="flex flex-col items-center gap-1 flex-1 py-2 cursor-pointer">
            <FiTrash2 size={18} />
            <span className="text-xs">Delete</span>
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
              <FiTrash2 />
            </AlertDialogMedia>
            <AlertDialogTitle>Delete {name}?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the food item. Do you want to
              proceed?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel variant="outline" className="cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <form action={deleteFoodById}>
              <AlertDialogAction variant="destructive" asChild>
                <SubmitButton
                  className="w-full cursor-pointer"
                  pendingText="Deleting..."
                >
                  Delete
                </SubmitButton>
              </AlertDialogAction>
            </form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default FoodDeleteButton;
