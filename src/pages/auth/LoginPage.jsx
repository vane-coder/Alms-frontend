// Auth — Login. STARTER: minimal working form so the team can sign in and
// test protected screens immediately. Person 3 owns the final styling.
//
// Dev logins (mock): student@knust.edu.gh / librarian@knust.edu.gh / admin@knust.edu.gh
// (any password)
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import Input from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button.jsx";

const HOME = { student: "/student/dashboard", librarian: "/librarian/dashboard", admin: "/admin/dashboard" };

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("student@knust.edu.gh");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    const user = await login(email, password);
    setBusy(false);
    navigate(HOME[user.role] || "/");
  }

  return (
    <form onSubmit={onSubmit} className="stack" style={{ gap: 18 }}>
      <h1 style={{ fontSize: 28 }}>Sign in</h1>
      <Input label="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button type="submit" variant="green" block disabled={busy}>{busy ? "Signing in…" : "Sign in"}</Button>
      <Link to="/forgot-password" style={{ color: "var(--green-700)", fontSize: 14 }}>Forgot password?</Link>
    </form>
  );
}
