import type {
  AggregatedTreeNode,
  CsvRow,
  CsvTreeNode,
  HierarchyCsvRow,
} from "./schema";

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

const toNumber = (val: unknown): number =>
  typeof val === "number" && !Number.isNaN(val) ? val : 0;

export function buildAggregatedTree(node: CsvTreeNode): AggregatedTreeNode {
  if (node.level === "item" && node.data) {
    const qty = toNumber(node.data.quantity);
    const rate = toNumber(node.data.rate);
    return {
      ...node,
      totalQty: qty,
      estRate: qty > 0 ? rate : 0,
      children: undefined,
    };
  }
  let totalQty = 0;
  let totalCost = 0;
  const children = (node.children ?? []).map(buildAggregatedTree);
  for (const child of children) {
    if (child.totalQty > 0 && child.estRate !== null) {
      totalQty += child.totalQty;
      totalCost += child.totalQty * child.estRate;
    }
  }
  return {
    ...node,
    children,
    totalQty,
    estRate: totalQty > 0 ? totalCost / totalQty : 0,
  };
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
