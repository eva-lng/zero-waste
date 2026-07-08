"use client";
import { useFormStatus } from "react-dom";
import SubmitButton from "./SubmitButton";
import { AlertDialogFooter } from "@/components/ui/alert-dialog";

const FoodDeleteActions = ({ onCancel }: { onCancel: () => void }) => {
  const { pending } = useFormStatus();
  return (
    <AlertDialogFooter>
      <button
        type="button"
        onClick={onCancel}
        disabled={pending}
        className="btn-outline hover:border-destructive hover:text-destructive disabled:opacity-40 disabled:pointer-events-none"
      >
        Cancel
      </button>
      <SubmitButton className="btn-destructive" pendingText="Deleting...">
        Delete
      </SubmitButton>
    </AlertDialogFooter>
  );
};

export default FoodDeleteActions;
