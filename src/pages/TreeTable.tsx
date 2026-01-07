import React, { useState } from "react";
import type { CsvTreeNode } from "../utils/schema";
import { thStyle } from "../allStyles";

type ITreeNode = {
  node: CsvTreeNode;
  depth: number;
  expanded: Set<string>;
  toggle: (id: string) => void;
};

export const TreeRow: React.FC<ITreeNode> = ({
  node,
  depth,
  expanded,
  toggle,
}) => {
  const isExpanded = expanded.has(node.id);
  const hasChildren = !!node.children?.length;
  const qty = node.totalQty ?? "";
  const rate = node.estRate ?? null;

  return (
    <>
      <tr style={{ background: "#fff", borderBottom: "1px solid #e5e7eb" }}>
        <td
          style={{
            padding: "8px",
            paddingLeft: 12 + depth * 20,
            fontWeight: node.level === "item" ? 400 : 600,
            whiteSpace: "nowrap",
            color: "#111",
          }}
        >
          {hasChildren && (
            <span
              onClick={() => toggle(node.id)}
              style={{
                display: "inline-block",
                width: 16,
                cursor: "pointer",
                marginRight: 6,
                color: "#374151",
              }}
            >
              {isExpanded ? "▾" : "▸"}
            </span>
          )}
          {node.label}
        </td>
        <td
          style={{
            textAlign: "right",
            padding: "8px",
            color: "#111",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {rate !== null ? `$${rate.toFixed(2)}` : ""}
        </td>
        <td
          style={{
            textAlign: "right",
            padding: "8px",
            color: "#111",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {qty || ""}
        </td>
      </tr>
      {isExpanded &&
        hasChildren &&
        node.children!.map((child) => (
          <TreeRow
            key={child.id}
            node={child}
            depth={depth + 1}
            expanded={expanded}
            toggle={toggle}
          />
        ))}
    </>
  );
};

export const TreeTable: React.FC<{ data: CsvTreeNode[] }> = ({ data }) => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div style={{ overflowX: "auto", background: "#fff" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "13px",
        }}
      >
        <thead>
          <tr style={{ background: "#f9fafb" }}>
            <th style={thStyle}>Category / Item</th>
            <th style={{ ...thStyle, textAlign: "right" }}>Est. Rate</th>
            <th style={{ ...thStyle, textAlign: "right" }}>Qty</th>
          </tr>
        </thead>
        <tbody>
          {data.map((node) => (
            <TreeRow
              key={node.id}
              node={node}
              depth={0}
              expanded={expanded}
              toggle={toggle}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
