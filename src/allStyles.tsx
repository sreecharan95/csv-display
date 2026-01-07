import { getHeatColor, getRateMinMax } from "./utils/commonUtils";
import type { ICell } from "./utils/schema";

export const uploadPageStyles: Record<string, React.CSSProperties> = {
  fileName: {
    marginTop: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    background: "#f3f4f6",
    padding: "8px 12px",
    borderRadius: "8px",
    fontSize: "14px",
  },
  page: {
    width: "100vw",
    height: "100vh",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    background: "linear-gradient(135deg, #f6f8fc, #eef2f7)",
  },
  emptyState: {
    minHeight: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #f8fafc, #eef2ff)",
    padding: "24px",
    boxSizing: "border-box",
  },
  emptyCard: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "32px 36px",
    textAlign: "center",
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
    maxWidth: "420px",
  },
  left: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
    boxSizing: "border-box",
  },
  right: {
    display: "flex",
    alignItems: "center",
    padding: "60px",
    boxSizing: "border-box",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    background: "#ffffff",
    borderRadius: "16px",
    padding: "32px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
    boxSizing: "border-box",
    textAlign: "center",
  },
  title: {
    margin: 0,
    fontSize: "26px",
    fontWeight: 600,
    color: "#1f2937",
  },
  subtitle: {
    marginTop: "8px",
    marginBottom: "24px",
    fontSize: "14px",
    color: "#6b7280",
  },
  uploadBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    width: "100%",
    minHeight: "120px",
    border: "2px dashed #c7d2fe",
    borderRadius: "12px",
    padding: "24px",
    background: "#f8faff",
    cursor: "pointer",
    boxSizing: "border-box",
    textAlign: "center",
  },
  uploadText: {
    display: "block",
    fontSize: "15px",
    fontWeight: 500,
    color: "#4f46e5",
  },
  helperText: {
    display: "block",
    marginTop: "6px",
    fontSize: "12px",
    color: "#6b7280",
  },
  errorBox: {
    marginTop: "16px",
    padding: "10px",
    background: "#fee2e2",
    color: "#b91c1c",
    borderRadius: "8px",
    fontSize: "13px",
  },
  info: {
    maxWidth: "500px",
  },
  infoTitle: {
    fontSize: "24px",
    fontWeight: 600,
    marginBottom: "12px",
    color: "#111827",
  },
  infoText: {
    fontSize: "15px",
    color: "#4b5563",
    lineHeight: 1.6,
    marginBottom: "24px",
  },
  sectionTitle: {
    fontSize: "16px",
    fontWeight: 600,
    marginTop: "24px",
    marginBottom: "8px",
    color: "#1f2937",
  },
  list: {
    paddingLeft: "18px",
    fontSize: "14px",
    color: "#374151",
    lineHeight: 1.6,
  },
};

export const tablePageStyles: Record<string, React.CSSProperties> = {
  emptyState: {
    minHeight: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #f8fafc, #eef2ff)",
    padding: "24px",
    boxSizing: "border-box",
  },
  emptyCard: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "32px 36px",
    textAlign: "center",
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
    maxWidth: "420px",
  },
  page: {
    minHeight: "100vh",
    width: "100vw",
    background: "linear-gradient(135deg, #f8fafc, #eef2ff)",
    padding: "24px 32px",
    boxSizing: "border-box",
    overflowX: "hidden",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: "20px",
    gap: "16px",
    flexWrap: "wrap",
  },
  tableCard: {
    width: "100%",
    background: "#ffffff",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
    boxSizing: "border-box",
    overflowX: "auto",
  },
  title: {
    fontSize: "24px",
    fontWeight: 700,
    margin: 0,
    color: "#1e293b",
  },
  subtitle: {
    marginTop: "6px",
    fontSize: "14px",
    color: "#64748b",
    lineHeight: 1.6,
    maxWidth: "720px",
  },
  secondaryButton: {
    padding: "10px 16px",
    borderRadius: "10px",
    border: "1px solid #c7d2fe",
    background: "#eef2ff",
    color: "#3730a3",
    fontWeight: 600,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
};

export const tableStyles: Record<string, React.CSSProperties> = {
  freezeSelect: {
    padding: "4px 8px",
    fontSize: "13px",
    cursor: "pointer",
    backgroundColor: "#fff",
    color: "#000",
    border: "1px solid #ccc",
    borderRadius: "4px",
    appearance: "auto",
  },
  container: {
    overflowX: "auto",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  columnDropdown: {
    position: "absolute",
    zIndex: 20,
    background: "#fff",
    border: "1px solid #ccc",
    borderRadius: "6px",
    padding: "10px",
    marginTop: "4px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
    maxHeight: "300px",
    overflowY: "auto",
    width: "220px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "800px",
    fontFamily: "Arial, sans-serif",
  },
  th: {
    borderBottom: "2px solid #e0e0e0",
    padding: "6px 8px",
    textAlign: "left",
    backgroundColor: "#f8f9fa",
    color: "#333",
    fontWeight: 600,
    position: "sticky",
    top: 0,
    zIndex: 1,
    userSelect: "none",
    whiteSpace: "nowrap",
  },
  td: {
    borderBottom: "1px solid #e0e0e0",
    padding: "6px",
    whiteSpace: "nowrap",
    color: "#0f0e0eff",
    textAlign: "center",
    verticalAlign: "middle",
    width: "120px",
    minWidth: "120px",
    maxWidth: "120px",
  },
  evenRow: {
    backgroundColor: "#ffffff",
  },
  oddRow: {
    backgroundColor: "#fdfdfd",
  },
};

export const getCellStyle = (props: ICell): React.CSSProperties => {
  const { header, row, supplierHeaders } = props;
  const value = row[header];
  const { min, max } = getRateMinMax(row, supplierHeaders);
  let cellBackground = "#fff";
  if (supplierHeaders.includes(header) && typeof value === "number") {
    cellBackground = getHeatColor(value, min, max);
  }
  return {
    ...tableStyles.td,
    backgroundColor: cellBackground,
  };
};

export const thStyle: React.CSSProperties = {
  padding: "10px 8px",
  textAlign: "left",
  fontWeight: 600,
  color: "#374151",
  borderBottom: "1px solid #e5e7eb",
};
