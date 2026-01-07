/* eslint-disable @typescript-eslint/no-explicit-any */
export type CsvRow = Record<string, any>;

import { z } from "zod";

export const CsvRowSchema = z.object({
  "Item Code": z.string(),
  Material: z.string(),
  Quantity: z.coerce.number(),
  "Estimated Rate": z.coerce.number(),
  "Supplier 1 (Rate)": z.coerce.number().optional(),
  "Supplier 2 (Rate)": z.coerce.number().optional(),
  "Supplier 3 (Rate)": z.coerce.number().optional(),
  "Supplier 4 (Rate)": z.coerce.number().optional(),
  "Supplier 5 (Rate)": z.coerce.number().optional(),
});

export const HierarchyRowSchema = z.object({
  Category: z.string(),
  "Sub Category 1": z.string(),
  "Sub Category 2": z.string(),
  "Item Code": z.string(),
  Description: z.string(),
  Quantity: z.coerce.number(),
  Rate: z.coerce.number(),
});

export type CsvTreeNode = {
  id: string;
  label: string;
  level: "category" | "sub1" | "sub2" | "item";
  children?: CsvTreeNode[];
  data?: {
    itemCode: string;
    description: string;
    quantity: number;
    rate: number;
  };
  totalQty?: number;
  estRate?: number;
};

export type csvTreeType = "flat" | "tree";

export type HierarchyCsvRow = z.infer<typeof HierarchyRowSchema>;

export interface ICell {
  header: string;
  row: CsvRow;
  supplierHeaders: string[];
}

export interface ICsvTable {
  data: CsvRow[];
  headers: string[];
}

export interface IAllData {
  data: CsvRow[];
  headers: string[];
}
