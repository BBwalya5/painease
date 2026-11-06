import { useEffect, useState } from "react";
import { getCurrentSession, logout } from "@/services/authService";
import type { AuthSession, User } from "@/types";

export function useSessionUser() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let active = true;
    const applySession = (value: AuthSession | null) => {
      if (!active) return;
      setSession(value);
      setUser(value?.user ?? null);
      setReady(true);
    };

    const refresh = () => {
      getCurrentSession()
      .then((value) => {
        applySession(value);
      })
      .catch(() => {
        applySession(null);
      })
    };

    const onSessionChange = (event: Event) => {
      const value = (event as CustomEvent<AuthSession | null>).detail;
      applySession(value);
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key === "painease.demo-session") refresh();
    };

    refresh();
    window.addEventListener("painease-session-change", onSessionChange);
    window.addEventListener("storage", onStorage);
    return () => {
      active = false;
      window.removeEventListener("painease-session-change", onSessionChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);
  const signOut = async () => { await logout(); setSession(null); setUser(null); };
  return { user, session, ready, signOut };
}
