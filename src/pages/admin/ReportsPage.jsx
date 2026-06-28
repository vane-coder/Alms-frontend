// SCREEN 8 — Reports & Analytics: report generator, KPI cards, charts, detailed table, export.
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  Download,
  Filter,
  MoreVertical,
  Search,
  TrendingUp,
  Users,
} from "lucide-react";
import AlertBanner from "../../components/ui/AlertBanner.jsx";
import Badge from "../../components/ui/Badge.jsx";
import Button from "../../components/ui/Button.jsx";
import Card from "../../components/ui/Card.jsx";
import Tabs from "../../components/ui/Tabs.jsx";
import DataTable from "../../components/tables/DataTable.jsx";
import StatCard from "../../components/stats/StatCard.jsx";
import "../../styles/globals.css";

const MONO = { fontFamily: "monospace", fontSize: 13 };

const STATS = [
  {
    tone: "active",
    eyebrow: "Borrows This Month",
    value: "112",
    label: "+14% vs last month",
    icon: TrendingUp,
  },
  {
    tone: "neutral",
    eyebrow: "Return Rate",
    value: "94%",
    label: "On-time returns",
    icon: CheckCircle,
  },
  {
    tone: "critical",
    eyebrow: "Overdue Rate",
    value: "10.3%",
    label: "+1.2% vs last month",
    icon: AlertTriangle,
  },
  {
    tone: "active",
    eyebrow: "Active Members",
    value: "340",
    label: "Registered users",
    icon: Users,
  },
];

const SECONDARY_STATS = [
  { label: "New Users This Month", value: "34" },
  { label: "Books Added", value: "8" },
  { label: "Avg. Borrow Duration", value: "11 days" },
  { label: "Most Borrowed Category", value: "Engineering" },
];

const TABS = [
  { id: "borrowing", label: "Borrowing Trends" },
  { id: "activity", label: "User Activity" },
  { id: "popularity", label: "Book Popularity" },
];

const BORROWING_TRENDS = [
  {
    id: 1,
    month: "June 2025",
    total: 112,
    returned: 105,
    overdue: 7,
    returnRate: 94,
    rateTone: "green",
  },
  {
    id: 2,
    month: "May 2025",
    total: 133,
    returned: 123,
    overdue: 10,
    returnRate: 92,
    rateTone: "green",
  },
  {
    id: 3,
    month: "April 2025",
    total: 98,
    returned: 86,
    overdue: 12,
    returnRate: 88,
    rateTone: "gold",
  },
  {
    id: 4,
    month: "March 2025",
    total: 105,
    returned: 75,
    overdue: 30,
    returnRate: 71,
    rateTone: "red",
  },
];

const USER_ACTIVITY = [
  {
    id: 1,
    name: "Dr. Kwame Mensah",
    email: "kmensah@knust.edu.gh",
    role: "Faculty",
    total: 24,
    returned: 24,
    overdue: 0,
    compliance: 100,
    complianceTone: "green",
  },
  {
    id: 2,
    name: "Abena Osei",
    email: "aosei.st@knust.edu.gh",
    role: "Student",
    total: 18,
    returned: 15,
    overdue: 3,
    compliance: 83,
    complianceTone: "amber",
  },
  {
    id: 3,
    name: "Prof. Yaa Asantewaa",
    email: "yasantewaa@knust.edu.gh",
    role: "Faculty",
    total: 32,
    returned: 22,
    overdue: 10,
    compliance: 68,
    complianceTone: "red",
  },
];

const BOOK_POPULARITY = [
  {
    id: 1,
    rank: 1,
    title: "Advanced Engineering Mathematics",
    category: "Engineering",
    borrows: 45,
    copies: 3,
    outOfStock: false,
  },
  {
    id: 2,
    rank: 2,
    title: "Introduction to Algorithms",
    category: "Computer Science",
    borrows: 38,
    copies: 0,
    outOfStock: true,
  },
  {
    id: 3,
    rank: 3,
    title: "Principles of Economics",
    category: "Business",
    borrows: 29,
    copies: 5,
    outOfStock: false,
  },
];

const BORROWING_COLUMNS = [
  { key: "month", header: "Month" },
  {
    key: "total",
    header: "Total Borrows",
    render: (row) => (
      <span style={{ ...MONO, fontWeight: 600, color: "var(--green-600)" }}>
        {row.total}
      </span>
    ),
  },
  {
    key: "returned",
    header: "Returned",
    render: (row) => <span style={MONO}>{row.returned}</span>,
  },
  {
    key: "overdue",
    header: "Overdue",
    render: (row) => (
      <span style={{ ...MONO, fontWeight: 600, color: "var(--red-600)" }}>
        {row.overdue}
      </span>
    ),
  },
  {
    key: "returnRate",
    header: "Return Rate",
    render: (row) => <Badge tone={row.rateTone}>{row.returnRate}%</Badge>,
  },
];

const USER_COLUMNS = [
  {
    key: "user",
    header: "User",
    render: (row) => (
      <div>
        <p style={{ margin: 0, fontWeight: 600 }}>{row.name}</p>
        <p style={{ margin: 0, fontSize: 12, color: "var(--muted)" }}>{row.email}</p>
      </div>
    ),
  },
  {
    key: "role",
    header: "Role",
    render: (row) => <Badge tone="neutral">{row.role}</Badge>,
  },
  {
    key: "total",
    header: "Total Borrows",
    render: (row) => <span style={MONO}>{row.total}</span>,
  },
  {
    key: "returned",
    header: "Returned",
    render: (row) => <span style={MONO}>{row.returned}</span>,
  },
  {
    key: "overdue",
    header: "Overdue",
    render: (row) => (
      <span
        style={{
          ...MONO,
          fontWeight: row.overdue > 0 ? 600 : 400,
          color: row.overdue > 0 ? "var(--red-600)" : "inherit",
        }}
      >
        {row.overdue}
      </span>
    ),
  },
  {
    key: "compliance",
    header: "Compliance",
    render: (row) => <Badge tone={row.complianceTone}>{row.compliance}%</Badge>,
  },
];

const BOOK_COLUMNS = [
  {
    key: "rank",
    header: "Rank",
    render: (row) => (
      <span style={{ ...MONO, color: "var(--muted)" }}>#{row.rank}</span>
    ),
  },
  { key: "title", header: "Book Title" },
  {
    key: "category",
    header: "Category",
    render: (row) => <Badge tone="neutral">{row.category}</Badge>,
  },
  {
    key: "borrows",
    header: "Total Borrows",
    render: (row) => (
      <span style={{ ...MONO, fontWeight: 600, color: "var(--green-600)" }}>
        {row.borrows}
      </span>
    ),
  },
  {
    key: "copies",
    header: "Copies Available",
    render: (row) =>
      row.outOfStock ? (
        <span style={{ ...MONO, fontWeight: 600, color: "var(--red-600)" }}>
          0 <span style={{ fontSize: 12, fontWeight: 400 }}>(Out of Stock)</span>
        </span>
      ) : (
        <span style={MONO}>{row.copies}</span>
      ),
  },
];

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("borrowing");
  const [userSearch, setUserSearch] = useState("");

  const filteredUsers = useMemo(() => {
    const query = userSearch.trim().toLowerCase();
    if (!query) return USER_ACTIVITY;
    return USER_ACTIVITY.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query),
    );
  }, [userSearch]);

  return (
    <div className="stack">
      <header className="row row--between" style={{ flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 className="page-title">Reports &amp; Analytics</h1>
          <p className="page-sub" style={{ marginBottom: 0 }}>
            System-wide trends and performance — KNUST Library
          </p>
        </div>
        <div className="row" style={{ flexWrap: "wrap" }}>
          <Button variant="outline">
            <Download size={18} />
            Export PDF
          </Button>
          <Button variant="outline">
            <Calendar size={18} />
            June 2025
          </Button>
        </div>
      </header>

      <AlertBanner
        tone="info"
        message="All reports reflect library data up to June 2025. Live data will sync when the backend is connected."
      />

      <section className="grid-stats">
        {STATS.map((stat) => (
          <StatCard key={stat.eyebrow} {...stat} />
        ))}
      </section>

      <div
        className="row"
        style={{
          flexWrap: "wrap",
          gap: 24,
          padding: "12px 20px",
          borderTop: "1px solid var(--border-soft)",
          borderBottom: "1px solid var(--border-soft)",
          background: "var(--surface)",
        }}
      >
        {SECONDARY_STATS.map((item) => (
          <div key={item.label} className="row" style={{ gap: 8 }}>
            <span style={{ color: "var(--muted)" }}>{item.label}:</span>
            <span style={{ fontWeight: 600 }}>{item.value}</span>
          </div>
        ))}
      </div>

      <section className="stack">
        <Tabs tabs={TABS} active={activeTab} onChange={setActiveTab} />

        {activeTab === "borrowing" && (
          <Card
            title="Monthly Borrowing Trends"
            action={
              <button
                type="button"
                className="btn btn--ghost btn--sm"
                aria-label="More options"
              >
                <MoreVertical size={18} />
              </button>
            }
          >
            <DataTable
              columns={BORROWING_COLUMNS}
              rows={BORROWING_TRENDS}
              rowKey="id"
              emptyMessage="No borrowing trend data available."
            />
            <p
              style={{
                margin: "14px 0 0",
                fontSize: 14,
                color: "var(--muted)",
                fontStyle: "italic",
              }}
            >
              Highest borrowing month: May 2025 (133 borrows)
            </p>
          </Card>
        )}

        {activeTab === "activity" && (
          <Card
            title="User Activity Breakdown"
            action={
              <div style={{ position: "relative", width: 220 }}>
                <Search
                  size={18}
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--muted)",
                    pointerEvents: "none",
                  }}
                />
                <input
                  className="input"
                  type="search"
                  placeholder="Search user..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  style={{ paddingLeft: 40 }}
                />
              </div>
            }
          >
            <DataTable
              columns={USER_COLUMNS}
              rows={filteredUsers}
              rowKey="id"
              emptyMessage="No users match your search."
            />
          </Card>
        )}

        {activeTab === "popularity" && (
          <Card
            title="Most Borrowed Books"
            action={
              <Button variant="outline" size="sm">
                <Filter size={16} />
                Filter
              </Button>
            }
          >
            <DataTable
              columns={BOOK_COLUMNS}
              rows={BOOK_POPULARITY}
              rowKey="id"
              emptyMessage="No book popularity data available."
            />
            <p
              style={{
                margin: "14px 0 0",
                paddingTop: 14,
                borderTop: "1px solid var(--border-soft)",
                fontSize: 14,
                color: "var(--muted)",
                fontStyle: "italic",
              }}
            >
              Most popular category: Engineering · 1 book(s) currently out of stock
            </p>
          </Card>
        )}
      </section>
    </div>
  );
}
