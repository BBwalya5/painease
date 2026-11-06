import { api, USE_MOCKS, setToken } from "@/lib/api";
import type { AuthSession, Role, User } from "@/types";
import { mockPractitioners, mockUsers } from "@/mocks/data";
const delay = () => new Promise((resolve) => setTimeout(resolve, 250));
const SESSION_KEY = "painease.demo-session";
const notifySessionChange = (session: AuthSession | null) => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("painease-session-change", { detail: session }));
  }
};

export async function login(email: string, password: string, role?: Role): Promise<AuthSession> {
  if (!USE_MOCKS) {
    const session = await api.post<AuthSession>("/auth/login", { email, password, role }); // TODO: POST /auth/login
    setToken(session.token);
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    notifySessionChange(session);
    return session;
  }
  await delay();
  const user = mockUsers.find((item) => item.role === role && item.email.toLowerCase() === email.toLowerCase()) ?? mockUsers.find((item) => item.email.toLowerCase() === email.toLowerCase());
  if (!user) throw new Error("No demo account matches that sign-in.");
  const session: AuthSession = { token:`demo-${user.role}-token`, user, practitioner:mockPractitioners.find((item) => item.userId === user.id) ?? null };
  setToken(session.token); localStorage.setItem(SESSION_KEY, JSON.stringify(session)); notifySessionChange(session); return session;
}
export async function register(input: Partial<User>): Promise<AuthSession> {
  if (!USE_MOCKS) {
    const session = await api.post<AuthSession>("/auth/register", input); // TODO: POST /auth/register
    setToken(session.token);
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    notifySessionChange(session);
    return session;
  }
  await delay();
  const user: User = { id:`user-${Date.now()}`, email:String(input.email??""), name:String(input.name??"PainEase User"), role:"user", age:null, painType:null, goals:[], status:"active", onboarded:false, consentAcceptedAt:null, createdAt:new Date().toISOString(), lastActiveAt:new Date().toISOString() };
  const session: AuthSession = { token:"demo-user-token", user, practitioner:null };
  setToken(session.token); localStorage.setItem(SESSION_KEY, JSON.stringify(session)); notifySessionChange(session); return session;
}
export async function loginWithGoogle(): Promise<AuthSession> {
  if (!USE_MOCKS) throw new Error("Google sign-in is not configured on the backend yet.");
  await delay();
  const user = mockUsers.find((item) => item.role === "user" && item.id === "user-1");
  if (!user) throw new Error("Google demo account is unavailable.");
  const session: AuthSession = { token:"demo-google-token", user, practitioner:null };
  setToken(session.token); localStorage.setItem(SESSION_KEY, JSON.stringify(session)); notifySessionChange(session); return session;
}
export async function getCurrentSession(): Promise<AuthSession | null> {
  if (!USE_MOCKS) return api.get("/auth/me"); // TODO: GET /auth/me
  await delay();
  const value = localStorage.getItem(SESSION_KEY);
  if (!value) return null;
  try {
    const session = JSON.parse(value) as AuthSession;
    if (!session.token || !session.user || !["user", "professional", "admin"].includes(session.user.role) || session.user.status !== "active") return null;
    return session;
  } catch {
    return null;
  }
}
export async function logout(): Promise<void> {
  if (!USE_MOCKS) await api.post("/auth/logout"); else { await delay(); localStorage.removeItem(SESSION_KEY); } // TODO: POST /auth/logout
  setToken(null);
  notifySessionChange(null);
}
