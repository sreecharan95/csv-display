import type { CsvRow, CsvTreeNode, HierarchyCsvRow } from "./schema";

export const headers = [
  "Item Code",
  "Material",
  "Quantity",
  "Estimated Rate",
  "Supplier 1 (Rate)",
  "Supplier 2 (Rate)",
  "Supplier 3 (Rate)",
  "Supplier 4 (Rate)",
  "Supplier 5 (Rate)",
];

export function getHeatColor(value: number, min: number, max: number): string {
  if (max === min) {
    return "rgb(255, 255, 0)";
  }
  const ratio = (value - min) / (max - min);
  let r: number, g: number;
  if (ratio <= 0.5) {
    r = Math.round(255 * (ratio / 0.5));
    g = 255;
  } else {
    r = 255;
    g = Math.round(255 * ((1 - ratio) / 0.5));
  }
  return `rgb(${r}, ${g}, 0)`;
}

export function getRateMinMax(
  row: CsvRow,
  supplierHeaders: string[]
): { min: number; max: number } {
  const rowRates = supplierHeaders
    .map((h) => row[h])
    .filter((v) => typeof v === "number") as number[];
  return {
    min: Math.min(...rowRates),
    max: Math.max(...rowRates),
  };
}

export function getStickyStyle(
  col: number,
  frozen: number
): React.CSSProperties {
  if (col <= frozen) {
    return {
      position: "sticky",
      left: `${col * 120}px`,
      zIndex: 2,
    };
  }
  return {};
}

export function getRecurseAggregates(node: CsvTreeNode): {
  qty: number;
  rate: number | null;
} {
  if (node.level === "item" && node.data) {
    const qty = Number(node.data.quantity) || 0;
    const rate = Number(node.data.rate) || 0;
    node.totalQty = qty;
    node.estRate = rate;
    return { qty, rate };
  }
  let totalQty = 0;
  let totalCost = 0;
  node.children?.forEach((child) => {
    const { qty, rate } = getRecurseAggregates(child);
    if (qty > 0 && rate !== null) {
      totalQty += qty;
      totalCost += qty * rate;
    }
  });
  const weightedRate = totalQty > 0 ? totalCost / totalQty : 0;
  node.totalQty = totalQty;
  node.estRate = weightedRate;
  return { qty: totalQty, rate: weightedRate };
}

export function buildCsvTree(rows: HierarchyCsvRow[]): CsvTreeNode[] {
  const categoryMap = new Map<string, CsvTreeNode>();
  rows.forEach((row) => {
    const {
      Category,
      "Sub Category 1": sub1,
      "Sub Category 2": sub2,
      "Item Code": itemCode,
      Description,
      Quantity,
      Rate,
    } = row;
    if (!categoryMap.has(Category)) {
      categoryMap.set(Category, {
        id: Category,
        label: Category,
        level: "category",
        children: [],
      });
    }
    const categoryNode = categoryMap.get(Category)!;
    let sub1Node = categoryNode.children!.find((c) => c.label === sub1);
    if (!sub1Node) {
      sub1Node = {
        id: `${Category}-${sub1}`,
        label: sub1,
        level: "sub1",
        children: [],
      };
      categoryNode.children!.push(sub1Node);
    }
    let sub2Node = sub1Node.children!.find((c) => c.label === sub2);
    if (!sub2Node) {
      sub2Node = {
        id: `${Category}-${sub1}-${sub2}`,
        label: sub2,
        level: "sub2",
        children: [],
      };
      sub1Node.children!.push(sub2Node);
    }
    sub2Node.children!.push({
      id: itemCode,
      label: itemCode,
      level: "item",
      data: {
        itemCode,
        description: Description,
        quantity: Quantity,
        rate: Rate,
      },
    });
  });
  return Array.from(categoryMap.values());
}
