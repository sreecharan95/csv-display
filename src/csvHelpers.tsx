import type { ICell } from "./utils/schema";

export function getDisplayValue(props: ICell): React.ReactNode {
  const { header, row, supplierHeaders } = props;
  const value = row[header];
  if (supplierHeaders.includes(header) && typeof value === "number") {
    const estimated = row["Estimated Rate"];
    if (typeof estimated === "number" && estimated !== 0) {
      const diff = ((value - estimated) / estimated) * 100;
      const arrow = diff > 0 ? "↑" : diff < 0 ? "↓" : "";
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            lineHeight: 1.2,
          }}
        >
          <span>{value}</span>
          <span style={{ fontSize: "0.75em", color: "#000" }}>
            {arrow} {Math.abs(diff).toFixed(1)}%
          </span>
        </div>
      );
    }
  }
  return value;
}
