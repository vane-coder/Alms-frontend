// Admin — User Management (roles, suspend/activate).
import { useMemo, useState } from "react";
import { Ban, ChevronLeft, ChevronRight, Search, UserPlus } from "lucide-react";
import Avatar from "../../components/ui/Avatar.jsx";
import Badge from "../../components/ui/Badge.jsx";
import Button from "../../components/ui/Button.jsx";
import Card from "../../components/ui/Card.jsx";
import Input from "../../components/ui/Input.jsx";
import Modal from "../../components/ui/Modal.jsx";
import Select from "../../components/ui/Select.jsx";
import DataTable from "../../components/tables/DataTable.jsx";
import "../../styles/globals.css";

const ROLE_OPTIONS = ["All", "Student", "Librarian", "Admin"];
const STATUS_OPTIONS = ["All", "Active", "Suspended", "Pending"];

const ROLE_TONE = {
  Student: "neutral",
  Librarian: "green",
  Admin: "gold",
};

const STATUS_TONE = {
  Active: "green",
  Pending: "amber",
  Suspended: "red",
};

const USERS = [
  {
    id: 1,
    name: "Kwame Asante",
    email: "k.asante@st.knust.edu.gh",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC7nw_Hgbgokur4qQD7reAJeyFeJn8WGvGQGn90brGGHjkWqICxkXxlft2KmgFJtfKSTa_MIeHJ7zhkT3k4eegk-FF2BoGisvCP04SI4WGKIqwxKeFf83PL1vN8ZbyRgSN_A54wjtRqdD0Ap7DxCISwtdQa5vqaRbjW50fPXJDdTjRM5acjvnhgl_Mrud0IjMtwq94IoAkT_GTxz2EJ5jqm7LTFmZ6aRZZIo8zPL65F4gYgLZSDLWjxTImnzgv0ECFSxiPpH7JU4Ac",
    role: "Student",
    joined: "2023-09-01",
    status: "Active",
  },
  {
    id: 2,
    name: "Ama Owusu",
    email: "a.owusu@knust.edu.gh",
    role: "Librarian",
    joined: "2021-01-15",
    status: "Active",
  },
  {
    id: 3,
    name: "Admin User",
    email: "admin@knust.edu.gh",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBEWaFTJjZxuDcdjkDoVnvnFulppwau5lMhWJoh42PjaKayLHNQeTApswodOYrw_PIRur0tzivJZpdTle-7JV6gsnw2vbl8dERDGZlIjIga-15Btb5EPh7zI15f4P_8tIimpdq9AROZl8DY8P0nb3C12TZyY3TNQfyEHPGhG5cBGSJce24rWDh_0wj4FKPgsC9PrPe9ur7nOks3NMnKC_gEHDk3kuEOkPiZsvgOhYNzavv94Ilf5izCafgtTErJ6YSNBJ_YuppFDlRne4",
    role: "Admin",
    joined: "2020-05-10",
    status: "Active",
  },
];

const SUMMARY = [
  { label: "130 Active", tone: "green" },
  { label: "8 Pending", tone: "gold" },
  { label: "4 Suspended", tone: "red" },
];

const USER_COLUMNS = [
  {
    key: "user",
    header: "User",
    render: (row) => (
      <div className="row">
        <Avatar src={row.avatar} name={row.name} size={32} />
        <div>
          <p style={{ margin: 0, fontWeight: 600 }}>{row.name}</p>
          <p style={{ margin: 0, fontSize: 12, color: "var(--muted)" }}>{row.email}</p>
        </div>
      </div>
    ),
  },
  {
    key: "role",
    header: "Role",
    render: (row) => <Badge tone={ROLE_TONE[row.role]}>{row.role}</Badge>,
  },
  {
    key: "joined",
    header: "Joined Date",
    render: (row) => (
      <span style={{ fontFamily: "monospace", fontSize: 13, color: "var(--muted)" }}>
        {row.joined}
      </span>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (row) => <Badge tone={STATUS_TONE[row.status]}>{row.status}</Badge>,
  },
  {
    key: "actions",
    header: "Actions",
    render: () => (
      <div className="row" style={{ justifyContent: "flex-end" }}>
        <Button variant="outline" size="sm">
          Edit
        </Button>
        <Button variant="danger" size="sm" aria-label="Suspend user">
          <Ban size={14} />
        </Button>
      </div>
    ),
  },
];

export default function UserManagementPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();
    return USERS.filter((user) => {
      const matchesSearch =
        !query ||
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query);
      const matchesRole = roleFilter === "All" || user.role === roleFilter;
      const matchesStatus = statusFilter === "All" || user.status === statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [search, roleFilter, statusFilter]);

  const totalPages = 18;

  return (
    <div className="stack">
      <header className="row row--between" style={{ flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 className="page-title">User Management</h1>
          <p className="page-sub" style={{ marginBottom: 0 }}>
            Manage all students, librarians, and admins
          </p>
        </div>
        <Button variant="gold" onClick={() => setShowAddModal(true)}>
          <UserPlus size={18} />
          Add User
        </Button>
      </header>

      <div className="row" style={{ flexWrap: "wrap", gap: 16 }}>
        <div style={{ position: "relative", flex: 1, minWidth: 220, maxWidth: 420 }}>
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
            placeholder="Search name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: 40 }}
          />
        </div>
        <Select
          label="Role"
          options={ROLE_OPTIONS}
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          style={{ width: 140 }}
        />
        <Select
          label="Status"
          options={STATUS_OPTIONS}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ width: 140 }}
        />
      </div>

      <div
        className="row row--between"
        style={{
          flexWrap: "wrap",
          gap: 12,
          paddingBottom: 16,
          borderBottom: "1px solid var(--border-soft)",
        }}
      >
        <span style={{ color: "var(--muted)", fontSize: 14 }}>
          Showing {filteredUsers.length} of 142 users
        </span>
        <div className="row" style={{ flexWrap: "wrap" }}>
          {SUMMARY.map((item) => (
            <Badge key={item.label} tone={item.tone}>
              {item.label}
            </Badge>
          ))}
        </div>
      </div>

      <Card>
        <DataTable
          columns={USER_COLUMNS}
          rows={filteredUsers}
          rowKey="id"
          emptyMessage="No users match your filters."
        />
        <div className="row row--between" style={{ paddingTop: 14 }}>
          <span style={{ fontSize: 13, color: "var(--muted)" }}>
            Page {page} of {totalPages}
          </span>
          <div className="pager" style={{ paddingTop: 0 }}>
            <button
              type="button"
              className="pager__btn"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              className="pager__btn"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              aria-label="Next page"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </Card>

      {showAddModal && (
        <Modal
          title="Add New User"
          onClose={() => setShowAddModal(false)}
          footer={
            <>
              <Button variant="outline" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button variant="gold">Create User</Button>
            </>
          }
        >
          <div className="stack" style={{ gap: 16 }}>
            <Input label="Full Name" id="add-user-name" type="text" />
            <Input label="Email Address" id="add-user-email" type="email" />
            <div className="row" style={{ alignItems: "flex-start" }}>
              <Select
                label="Role"
                id="add-user-role"
                options={["Student", "Librarian", "Admin"]}
                defaultValue="Student"
                style={{ flex: 1 }}
              />
              <Select
                label="Initial Status"
                id="add-user-status"
                options={["Active", "Pending"]}
                defaultValue="Active"
                style={{ flex: 1 }}
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
