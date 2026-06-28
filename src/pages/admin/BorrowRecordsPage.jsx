// Admin — Borrow Records (full list).
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Download, Search } from "lucide-react";
import AlertBanner from "../../components/ui/AlertBanner.jsx";
import Button from "../../components/ui/Button.jsx";
import Card from "../../components/ui/Card.jsx";
import Select from "../../components/ui/Select.jsx";
import DataTable from "../../components/tables/DataTable.jsx";
import StatusBadge from "../../components/tables/StatusBadge.jsx";
import { BORROW_STATUS } from "../../constants/borrowStatus.js";
import "../../styles/globals.css";

const STATUS_OPTIONS = ["All Statuses", "Active", "Overdue", "Returned"];

const STATUS_FILTER_MAP = {
  Active: BORROW_STATUS.ACTIVE,
  Overdue: BORROW_STATUS.OVERDUE,
  Returned: BORROW_STATUS.RETURNED,
};

const SUMMARY = [
  { label: "Total Records", value: "142", tone: "neutral" },
  { label: "Active", value: "38", tone: "green" },
  { label: "Overdue", value: "2", tone: "red" },
  { label: "Returned", value: "102", tone: "neutral" },
];

const BORROW_RECORDS = [
  {
    id: "BR-8492",
    borrower: "Dr. Kwame Osei",
    borrowerDetail: "Faculty - Engineering",
    book: "Advanced Structural Mechanics",
    isbn: "978-3-16-148410-0",
    borrowedOn: "2023-10-15",
    dueDate: "2023-11-15",
    returnedOn: null,
    status: BORROW_STATUS.ACTIVE,
  },
  {
    id: "BR-8491",
    borrower: "Ama Mensah",
    borrowerDetail: "Student - CompSci",
    book: "Introduction to Algorithms",
    isbn: "978-0-262-03384-8",
    borrowedOn: "2023-09-01",
    dueDate: "2023-09-15",
    returnedOn: null,
    status: BORROW_STATUS.OVERDUE,
  },
  {
    id: "BR-8490",
    borrower: "Prof. Yaa Asantewaa",
    borrowerDetail: "Faculty - History",
    book: "The History of West Africa",
    isbn: "978-1-847-01034-7",
    borrowedOn: "2023-10-01",
    dueDate: "2023-11-01",
    returnedOn: "2023-10-28",
    status: BORROW_STATUS.RETURNED,
  },
  {
    id: "BR-8489",
    borrower: "Kofi Annan",
    borrowerDetail: "Student - PoliSci",
    book: "Global Governance Patterns",
    isbn: "978-0-19-882894-4",
    borrowedOn: "2023-10-20",
    dueDate: "2023-11-20",
    returnedOn: null,
    status: BORROW_STATUS.ACTIVE,
  },
  {
    id: "BR-8488",
    borrower: "Akosua Serwaa",
    borrowerDetail: "Staff - Administration",
    book: "Effective Management Strategies",
    isbn: "978-1-119-39148-5",
    borrowedOn: "2023-09-10",
    dueDate: "2023-10-10",
    returnedOn: "2023-10-05",
    status: BORROW_STATUS.RETURNED,
  },
];

const MONO = { fontFamily: "monospace", fontSize: 13 };

const BORROW_COLUMNS = [
  {
    key: "id",
    header: "# ID",
    render: (row) => (
      <span style={{ ...MONO, color: "var(--muted)" }}>{row.id}</span>
    ),
  },
  {
    key: "borrower",
    header: "Borrower",
    render: (row) => (
      <div>
        <p style={{ margin: 0, fontWeight: 600 }}>{row.borrower}</p>
        <p style={{ margin: 0, fontSize: 13, color: "var(--muted)" }}>
          {row.borrowerDetail}
        </p>
      </div>
    ),
  },
  {
    key: "book",
    header: "Book Title",
    render: (row) => (
      <div>
        <p style={{ margin: 0 }}>{row.book}</p>
        <p style={{ margin: "4px 0 0", ...MONO, fontSize: 12, color: "var(--muted)" }}>
          ISBN: {row.isbn}
        </p>
      </div>
    ),
  },
  {
    key: "borrowedOn",
    header: "Borrowed On",
    render: (row) => <span style={MONO}>{row.borrowedOn}</span>,
  },
  {
    key: "dueDate",
    header: "Due Date",
    render: (row) => (
      <span
        style={{
          ...MONO,
          fontWeight: row.status === BORROW_STATUS.OVERDUE ? 700 : 400,
          color: row.status === BORROW_STATUS.OVERDUE ? "var(--red-600)" : "inherit",
        }}
      >
        {row.dueDate}
      </span>
    ),
  },
  {
    key: "returnedOn",
    header: "Returned On",
    render: (row) => (
      <span style={{ ...MONO, color: "var(--muted)" }}>
        {row.returnedOn ?? "—"}
      </span>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (row) => (
      <div style={{ textAlign: "right" }}>
        <StatusBadge status={row.status} />
      </div>
    ),
  },
];

export default function BorrowRecordsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [page, setPage] = useState(1);

  const filteredRecords = useMemo(() => {
    const query = search.trim().toLowerCase();
    return BORROW_RECORDS.filter((record) => {
      const matchesSearch =
        !query ||
        record.borrower.toLowerCase().includes(query) ||
        record.book.toLowerCase().includes(query);
      const matchesStatus =
        statusFilter === "All Statuses" ||
        record.status === STATUS_FILTER_MAP[statusFilter];
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const overdueCount = BORROW_RECORDS.filter(
    (record) => record.status === BORROW_STATUS.OVERDUE,
  ).length;

  const totalPages = 29;

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All Statuses");
    setPage(1);
  };

  return (
    <div className="stack">
      <header className="row row--between" style={{ flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 className="page-title">Borrow Records</h1>
          <p className="page-sub" style={{ marginBottom: 0 }}>
            Full transaction log — all users, all books
          </p>
        </div>
        <Button variant="outline">
          <Download size={18} />
          Export CSV
        </Button>
      </header>

      {overdueCount > 0 && (
        <AlertBanner
          message={`${overdueCount} borrow record(s) are currently overdue.`}
        />
      )}

      <div
        className="row"
        style={{
          flexWrap: "wrap",
          gap: 16,
          padding: "16px 20px",
          background: "var(--surface)",
          border: "1px solid var(--border-soft)",
          borderRadius: "var(--radius)",
        }}
      >
        {SUMMARY.map((item, index) => (
          <div key={item.label} className="row" style={{ gap: 8 }}>
            {index > 0 && (
              <span
                aria-hidden
                style={{
                  width: 1,
                  height: 16,
                  background: "var(--border)",
                  marginRight: 8,
                }}
              />
            )}
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: "var(--muted)",
              }}
            >
              {item.label}:
            </span>
            <span
              style={{
                ...MONO,
                fontWeight: 700,
                color:
                  item.tone === "green"
                    ? "var(--green-600)"
                    : item.tone === "red"
                      ? "var(--red-600)"
                      : "var(--ink)",
              }}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>

      <div
        className="row"
        style={{
          flexWrap: "wrap",
          gap: 16,
          padding: 16,
          background: "var(--surface)",
          border: "1px solid var(--border-soft)",
          borderRadius: "var(--radius)",
        }}
      >
        <div style={{ position: "relative", flex: 1, minWidth: 220 }}>
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
            placeholder="Search by borrower or book title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: 40 }}
          />
        </div>
        <Select
          label="Status"
          options={STATUS_OPTIONS}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ width: 160 }}
        />
        <Button variant="ghost" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>

      <Card>
        <DataTable
          columns={BORROW_COLUMNS}
          rows={filteredRecords}
          rowKey="id"
          emptyMessage="No borrow records match your filters."
        />
        <div className="row row--between" style={{ paddingTop: 14 }}>
          <span style={{ fontSize: 13, color: "var(--muted)" }}>
            Showing 1 to {filteredRecords.length} of 142 records
          </span>
          <div className="row row--between" style={{ gap: 12 }}>
            <span style={{ ...MONO, fontWeight: 600 }}>
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
        </div>
      </Card>
    </div>
  );
}
