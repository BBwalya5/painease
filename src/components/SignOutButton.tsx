import { LogOut } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useSessionUser } from "@/hooks/use-session";

interface SignOutButtonProps {
  className?: string;
}

export function SignOutButton({ className = "" }: SignOutButtonProps) {
  const navigate = useNavigate();
  const { signOut } = useSessionUser();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleSignOut = async () => {
    setBusy(true);
    setError("");
    try {
      await signOut();
      await navigate({ to: "/auth", replace: true });
    } catch (signOutError) {
      setError(signOutError instanceof Error ? signOutError.message : "Could not sign out.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={className}>
      <button
        type="button"
        onClick={handleSignOut}
        disabled={busy}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-destructive/20 px-3 py-2.5 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <LogOut className="h-4 w-4" />
        {busy ? "Signing out..." : "Sign out"}
      </button>
      {error && <p role="alert" className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}
