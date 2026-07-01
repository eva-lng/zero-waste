"use client";
import { useState } from "react";
import deleteFood from "@/app/actions/deleteFood";
import SubmitButton from "./SubmitButton";
import { capitalize } from "@/lib/utils/utilities";
import { FiTrash2 } from "react-icons/fi";
import {
  AlertDialog,
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
  const [dialogOpen, setDialogOpen] = useState(false);

  const deleteFoodById = deleteFood.bind(null, foodId);

  const handleOpenChange = (isOpen: boolean) => {
    setDialogOpen(isOpen);
  };

  return (
    <>
      <AlertDialog open={dialogOpen} onOpenChange={handleOpenChange}>
        <AlertDialogTrigger asChild>
          <button className="flex flex-col items-center gap-1 flex-1 p-2 cursor-pointer text-destructive hover:bg-muted hover:font-medium">
            <FiTrash2 size={16} />
            <span className="text-xs">Delete</span>
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base">
              Delete {name}?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-foreground text-left">
              This will permanently remove <strong>{capitalize(name)}</strong>{" "}
              from your inventory. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <button
              type="button"
              onClick={() => setDialogOpen(false)}
              className="btn-outline hover:border-destructive hover:text-destructive focus-visible:ring-destructive"
            >
              Cancel
            </button>
            <form action={deleteFoodById}>
              <SubmitButton
                className="btn-destructive"
                pendingText="Deleting..."
              >
                Delete
              </SubmitButton>
            </form>
          </AlertDialogFooter>

          {/* <AlertDialogFooter>
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
          </AlertDialogFooter> */}
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default FoodDeleteButton;
