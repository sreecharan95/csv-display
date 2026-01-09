import React, { useState, useMemo, useRef, useEffect } from "react";
import type { ICell, ICsvTable } from "../utils/schema";
import {
  getCellStyle,
  tableStyles as styles,
} from "../styles/custom/allStyles";
import { getStickyStyle } from "../utils/commonUtils";
import "../styles/csvTable.css";

function getDisplayValue(props: ICell): React.ReactNode {
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

const CsvTable: React.FC<ICsvTable> = ({ data, headers }) => {
  const supplierHeaders = headers.filter(
    (h) => h.includes("Rate") && h !== "Estimated Rate"
  );
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(
    () => new Set(headers)
  );
  const visibleHeaders = headers.filter((h) => visibleColumns.has(h));
  const columnGroups: Record<string, string[]> = {
    Core: ["Item Code", "Material", "Quantity", "Estimated Rate"],
    Suppliers: supplierHeaders,
  };
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [freezeUntilVal, setFreezeUntilVal] = useState<string | null>(null);

  const frozenIndex = useMemo(() => {
    if (!freezeUntilVal) return -1;
    return headers.indexOf(freezeUntilVal);
  }, [freezeUntilVal, headers]);

  const sortedData = useMemo(() => {
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
      }
      return sortConfig.direction === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [data, sortConfig]);

  const handleSort = (header: string) => {
    setSortConfig((prev) =>
      prev?.key === header
        ? { key: header, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key: header, direction: "asc" }
    );
  };

  const toggleColumn = (header: string) => {
    setVisibleColumns((prev) => {
      const next = new Set(prev);
      if (next.has(header)) {
        next.delete(header);
      } else {
        next.add(header);
      }
      return next;
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <div style={styles.container}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <div style={{ margin: "10px", position: "relative" }} ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            style={styles.freezeSelect}
          >
            Columns ({visibleColumns.size}) ▼
          </button>
          {isDropdownOpen && (
            <div style={styles.columnDropdown}>
              {Object.keys(columnGroups).map((group) => {
                const g = group as keyof typeof columnGroups;
                const allSelected = columnGroups[g].every((h) =>
                  visibleColumns.has(h)
                );
                return (
                  <div key={group} style={{ marginBottom: "10px" }}>
                    <div
                      style={{
                        fontWeight: 600,
                        marginBottom: "4px",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span style={{ color: "black" }}>{group}</span>
                      <button
                        onClick={() => {
                          if (allSelected) {
                            setVisibleColumns((prev) => {
                              const next = new Set(prev);
                              columnGroups[g].forEach((h) => next.delete(h));
                              return next;
                            });
                          } else {
                            setVisibleColumns((prev) => {
                              const next = new Set(prev);
                              columnGroups[g].forEach((h) => next.add(h));
                              return next;
                            });
                          }
                        }}
                        style={{
                          fontSize: "11px",
                          padding: "2px 4px",
                          cursor: "pointer",
                          background: "#be1919ff",
                        }}
                      >
                        {allSelected ? "None" : "All"}
                      </button>
                    </div>
                    {columnGroups[g].map((header) => (
                      <label
                        key={header}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "13px",
                          padding: "2px 0",
                          cursor: "pointer",
                          color: "black",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={visibleColumns.has(header)}
                          onChange={() => toggleColumn(header)}
                          style={{ marginRight: "6px" }}
                        />
                        {header}
                      </label>
                    ))}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div style={{ marginBottom: "12px", display: "flex", gap: "8px" }}>
          <label style={{ color: "#000", fontWeight: 600, fontSize: "16px" }}>
            Freeze columns up to:
          </label>
          <select
            value={freezeUntilVal ?? ""}
            onChange={(e) => setFreezeUntilVal(e.target.value || null)}
            style={styles.freezeSelect}
          >
            <option value="" style={{ backgroundColor: "#fff", color: "#000" }}>
              None
            </option>
            {headers.map((h) => (
              <option
                key={h}
                value={h}
                style={{ backgroundColor: "#fff", color: "#000" }}
              >
                {h}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div
        className="csv-scroll-container"
        style={{
          overflow: "auto",
          maxWidth: "100%",
          maxHeight: "70vh",
        }}
      >
        {" "}
        <table style={styles.table}>
          <thead>
            <tr>
              {visibleHeaders.map((header, colIndex) => (
                <th
                  key={header}
                  style={{
                    ...styles.th,
                    cursor: "pointer",
                    textAlign: "center",
                    ...getStickyStyle(colIndex, frozenIndex),
                    zIndex: colIndex <= frozenIndex ? 3 : 1,
                  }}
                  onClick={() => handleSort(header)}
                >
                  {header}{" "}
                  <span style={{ fontSize: "12px" }}>
                    {sortConfig?.key === header
                      ? sortConfig.direction === "asc"
                        ? "▲"
                        : "▼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, index) => {
              return (
                <tr
                  key={index}
                  style={index % 2 === 0 ? styles.evenRow : styles.oddRow}
                >
                  {visibleHeaders.map((header, colIndex) => {
                    const cellObj = { header, row, supplierHeaders };
                    const finalStyles = {
                      ...getCellStyle(cellObj),
                      ...getStickyStyle(colIndex, frozenIndex),
                    };
                    return (
                      <td key={header} style={finalStyles}>
                        {getDisplayValue(cellObj)}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CsvTable;
