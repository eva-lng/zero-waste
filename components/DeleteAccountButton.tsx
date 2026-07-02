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
import { FiTrash2 } from "react-icons/fi";

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
        className="inline-flex items-center justify-center gap-2 btn-destructive-subtle w-full md:w-auto md:self-start"
      >
        <FiTrash2 aria-hidden="true" />
        Delete account
      </button>
      <AlertDialog open={dialogOpen} onOpenChange={handleOpenChange}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base">
              Delete account?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-foreground text-left">
              This will permanently delete your account and all your data. This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="mb-2">
            <p className="text-sm mb-1">
              Type <strong>{username}</strong> to confirm:
            </p>
            <input
              type="text"
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
              placeholder="username"
              className="input py-1.5 focus-visible:ring-destructive"
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
              className="btn-outline hover:border-destructive hover:text-destructive focus-visible:ring-destructive"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={!isConfirmed || loading}
              className="btn-destructive"
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
