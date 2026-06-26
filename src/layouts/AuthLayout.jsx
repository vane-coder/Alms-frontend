// AuthLayout — split screen: branding panel (left) + form card (right).
// Used by login / forgot-password / reset-password (Screen 3).
import { Outlet } from "react-router-dom";
import { BookOpen } from "lucide-react";

export default function AuthLayout() {
  return (
    <div style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", background: "var(--cream)" }}>
      <div style={{ display: "grid", placeItems: "center", padding: 40, background: "var(--cream-dark)" }}>
        <div style={{ textAlign: "center" }}>
          <BookOpen size={72} color="var(--green-700)" />
          <h1 style={{ fontSize: 34, marginTop: 16 }}>KNUST Library</h1>
          <p style={{ color: "var(--muted)", marginTop: 8 }}>Automated Library Management System</p>
        </div>
      </div>
      <div style={{ display: "grid", placeItems: "center", padding: 40 }}>
        <div style={{ width: "100%", maxWidth: 420 }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
