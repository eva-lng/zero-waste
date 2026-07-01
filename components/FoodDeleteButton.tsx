import deleteFood from "@/app/actions/deleteFood";
import SubmitButton from "./SubmitButton";
import { capitalize } from "@/lib/utils/utilities";
import { FiTrash2 } from "react-icons/fi";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
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
          <button className="flex flex-col items-center gap-1 flex-1 p-2 cursor-pointer text-destructive hover:bg-muted hover:font-medium">
            <FiTrash2 size={16} />
            <span className="text-xs">Delete</span>
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            {/* <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
              <FiTrash2 />
            </AlertDialogMedia> */}
            <AlertDialogTitle className="text-base">
              Delete {name}?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-foreground text-left">
              This will permanently remove <strong>{capitalize(name)}</strong>{" "}
              from your inventory. This action cannot be undone.
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
