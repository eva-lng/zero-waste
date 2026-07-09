"use client";
import { useState } from "react";
import deleteFood from "@/app/actions/deleteFood";
import FoodDeleteActions from "./FoodDeleteActions";
import { capitalize } from "@/lib/utils/utilities";
import { TbTrash } from "react-icons/tb";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
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
            <TbTrash size={16} />
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

          <form action={deleteFoodById}>
            <FoodDeleteActions onCancel={() => setDialogOpen(false)} />
          </form>
          {/* <AlertDialogFooter>
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
          </AlertDialogFooter> */}
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default FoodDeleteButton;
