// SCREEN 4 — Admin Dashboard: overview stats, lending charts, user mgmt + borrow records tables.
import { Link } from "react-router-dom";
import {
  Users,
  BookOpen,
  ClipboardList,
  AlertTriangle,
} from "lucide-react";
import AlertBanner from "../../components/ui/AlertBanner.jsx";
import Badge from "../../components/ui/Badge.jsx";
import Avatar from "../../components/ui/Avatar.jsx";
import Card from "../../components/ui/Card.jsx";
import StatCard from "../../components/stats/StatCard.jsx";
import DataTable from "../../components/tables/DataTable.jsx";
import StatusBadge from "../../components/tables/StatusBadge.jsx";
import { BORROW_STATUS } from "../../constants/borrowStatus.js";

const STATS = [
  { tone: "active", eyebrow: "Total Users", value: "1,240", label: "Active", icon: Users },
  { tone: "neutral", eyebrow: "Total Books", value: "3,580", label: "In catalog", icon: BookOpen },
  { tone: "warning", eyebrow: "Active Borrows", value: "87", label: "Currently out", icon: ClipboardList },
  { tone: "critical", eyebrow: "Overdue Books", value: "12", label: "Needs attention", icon: AlertTriangle },
];

const BORROW_RECORDS = [
  {
    id: 1,
    name: "Kwame Asante",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCJYqq2zTRJjcdcKDGZAmoOZ1bImGjjdSCF91XT3KWMs7QcX1JDyAqqt-9etu2wMoWUf87s58pClkhpm2MqeDsUhpIgGhYoQlceVoSpE3T5UABpLMlzRCCftgroz0WkIX6dQQ3q471MqrQJ86u9b3zbSXAADFCzC3d0CS7L8fD-Xvvt79xQNnRjt3dRTxW7I8okgcSOPx7qwQC7km4RYrugi9V2IzOp9vMR4k6Y1l0DQHotiN22_t4YihT3n28OqnJMwMqdH6qMhBI",
    book: "Advanced Engineering Mathematics",
    role: "Student",
    status: BORROW_STATUS.ACTIVE,
  },
  {
    id: 2,
    name: "Ama Owusu",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD9IvWpmth5oe6xSi-Ta1uDTU-7qRLUVhlpHfhkYz7tS6ltfXEqJ4DrJ-dFKH0VWomehFTwsYkwwow1_oygX7Pd_XNiSwv-1UIXPXQr6EcqJtuOFG6yYeJspf6ZfoDME7VCKNRZQHgbqGgMdANgYoeV8shjL5tmnlR8EbYznXIi-d-gjdL8rlviXBGKn4Vm1TxkycQ21b3YSoxf6ck15STiMeHtYxUQsaEQO1-tLdTkQXcZtf2SHO097I3-gFX7JVp9g_Z2RCmnp7s",
    book: "Introduction to Algorithms",
    role: "Student",
    status: BORROW_STATUS.DUE_SOON,
  },
  {
    id: 3,
    name: "Kofi Mensah",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBhpf0xZ8WAa0GUytUp9LDGScxBvBm-JC0_w9eRf6ub6QZwsrn3y4T-0eQRHtMBFVESS4es5V2i5sb1lmJNyB7petUNS5ClcNUmY1Pz6YoSJb_0rwTUwLr_benKV_i0IL_Bm_Yl9d_4n64qLdR3mrVaamQzu9SOePquNEyicIRfvC0Z0cX54UewblECYlnRBtKdvq1rXJL6sR7pJHBs-CB1yxCrH1EerFzNxJhjPmpLO89moab7gkw_pRphKGRcZi5TY7WgT5XaEzw",
    book: "Principles of Macroeconomics",
    role: "Student",
    status: BORROW_STATUS.OVERDUE,
  },
  {
    id: 4,
    name: "Dr. Boateng",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCfBxGR0Fem7M-V-taRH8jw2SQkklYheE9-R9onLj-3cJQiMRjU2ET-umrWftkCU1DK5yQTEKwP5JdLObC6arwAXyACrH5klDECBnhWtTpJdGNZftX6I1_jhXCtsbigiUCiKfzbA_zuEIDoMI_9uH3zymrZ1RFpYvttG4D0JGyM3Cz-BHcgLM_FKBBmjC8GIxHIiDUAzj4WrDXemzUt8d4p_MPJICN0nSNgRrS214u8ud5GjVlJ0O0oo8WFLKkTQ4CzyeSZwijcwGQ",
    book: "Research Methods in Sciences",
    role: "Faculty",
    status: BORROW_STATUS.ACTIVE,
  },
  {
    id: 5,
    name: "Abena Frimpong",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDoLyUw72-kdrtEt2HBhke1R845OX_1slzkDEbK_X7nvQRiK6rgIGVIirspfHfrnRX70N_vnpaWtNeAFev1BP7MfauHiSkQKHpHC8uhrGp0vDHz3rcflCVrlKih4DCHCKKzYS3Dg2XE0VaVT-Xakk7TgtlLaSgNyi2LbYshKSb5w3jkW5Kfu5j7HUivsK8mErBEjZuKIVCzNNH1IbncVExPiocPsmY0YhqhTnod9T4WGu8MktpkHWmMjHNQsCZgcAssSKMuxRL8jyI",
    book: "Organic Chemistry Vol. 2",
    role: "Student",
    status: BORROW_STATUS.ACTIVE,
  },
];

const SNAPSHOT_ITEMS = [
  { label: "New Users (7d)", value: "34" },
  { label: "Books Added (7d)", value: "8" },
  { label: "Borrows (7d)", value: "112" },
  { label: "Return Rate", value: "94%", highlight: true },
  { label: "Most Borrowed", value: "Engineering" },
];

const BORROW_COLUMNS = [
  {
    key: "borrower",
    header: "Borrower",
    render: (row) => (
      <div className="row">
        <Avatar src={row.avatar} name={row.name} size={32} />
        <span>{row.name}</span>
      </div>
    ),
  },
  { key: "book", header: "Book Title" },
  {
    key: "role",
    header: "Role",
    render: (row) => <Badge tone="neutral">{row.role}</Badge>,
  },
  {
    key: "status",
    header: "Status",
    render: (row) => <StatusBadge status={row.status} />,
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="stack">
      <header>
        <h1 className="page-title">Admin Dashboard</h1>
        <p className="page-sub">System overview — KNUST Library</p>
      </header>

      <AlertBanner message="12 books are currently overdue. Review the Borrow Records for details." />

      <section className="grid-stats">
        {STATS.map((stat) => (
          <StatCard key={stat.eyebrow} {...stat} />
        ))}
      </section>

      <section className="stack">
        <Card title="Recent Borrowing Activity">
          <DataTable
            columns={BORROW_COLUMNS}
            rows={BORROW_RECORDS}
            rowKey="id"
            emptyMessage="No recent borrowing activity."
          />
        </Card>

        <Card title="System Snapshot">
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {SNAPSHOT_ITEMS.map((item, index) => (
              <li
                key={item.label}
                className="row row--between"
                style={{
                  padding: "12px 0",
                  borderBottom:
                    index < SNAPSHOT_ITEMS.length - 1
                      ? "1px solid var(--border-soft)"
                      : "none",
                }}
              >
                <span style={{ color: "var(--muted)" }}>{item.label}</span>
                <span
                  style={{
                    fontWeight: 700,
                    color: item.highlight ? "var(--green-600)" : "var(--ink)",
                  }}
                >
                  {item.value}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <Card title="Quick Actions">
        <div className="row" style={{ flexWrap: "wrap", gap: 12 }}>
          <Link to="/admin/users" className="btn btn--gold">
            Manage Users
          </Link>
          <Link to="/admin/borrow-records" className="btn btn--outline">
            View Borrow Records
          </Link>
          <Link to="/admin/reports" className="btn btn--outline">
            Reports &amp; Analytics
          </Link>
          <Link to="/settings" className="btn btn--ghost">
            System Settings
          </Link>
        </div>
      </Card>
    </div>
  );
}
