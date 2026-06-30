"use cleint";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";

const DeleteAccountButton = ({ username }: { username: string }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const isConfirmed = confirmation === username;

  const handleOpenChange = (isOpen: boolean) => {
    setDialogOpen(isOpen);
    if (!isOpen) {
      setConfirmation("");
      setError(null);
    }
  };

  const handleDelete = async () => {
    if (!isConfirmed) return;
    setError(null);

    await authClient.deleteUser(
      {},
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          router.push("/");
        },
        onError: (ctx) => {
          setError(ctx.error.message);
          setLoading(false);
        },
      },
    );
  };

  return (
    <>
      <button
        onClick={() => setDialogOpen(true)}
        className="w-full md:w-auto md:self-start bg-destructive-light text-destructive-light-foreground rounded-lg px-4 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
      >
        Delete account
      </button>
      <AlertDialog open={dialogOpen} onOpenChange={handleOpenChange}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            {/* <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            </AlertDialogMedia> */}
            <AlertDialogTitle>Delete account</AlertDialogTitle>
            <AlertDialogDescription>
              This action is permanent and cannot be undone. All your data will
              be deleted. Type <strong>{username}</strong> to confirm.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="my-2">
            <input
              type="text"
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
              placeholder="username"
              className="w-full border rounded-md px-3 py-1.5 text-sm bg-card focus:outline-none focus:ring-1 focus:ring-destructive"
            />
            {error && (
              <small className="block mt-0.5 text-xs text-destructive text-right">
                {error}
              </small>
            )}
          </div>

          <AlertDialogFooter>
            <button
              type="button"
              onClick={() => {
                setDialogOpen(false);
                setConfirmation("");
                setError(null);
              }}
              className="text-sm text-muted-foreground"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={!isConfirmed || loading}
              className="btn-destructive-subtle"
            >
              {loading && <Spinner />}{" "}
              {loading ? "Deleting..." : "Delete account"}
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteAccountButton;
