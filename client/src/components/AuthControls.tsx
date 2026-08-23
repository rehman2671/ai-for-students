import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { LogIn, LogOut, UserRound } from "lucide-react";

export default function AuthControls() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  if (loading) return <span className="auth-status auth-status--loading">Checking account…</span>;
  if (!isAuthenticated) return <button className="auth-action" onClick={() => startLogin()}><LogIn size={14} /> Save progress</button>;
  return <div className="auth-user"><span><UserRound size={14} /> {user?.name || "Learner"}</span><button className="auth-action auth-action--quiet" onClick={() => logout()}><LogOut size={14} /> Log out</button></div>;
}
