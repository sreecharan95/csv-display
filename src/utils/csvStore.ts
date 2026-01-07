/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface CsvStore {
  data: any[];
  headers: string[];
  tableType: "flat" | "tree";
  setCsv: (data: any[], headers: string[], type?: "flat" | "tree") => void;
  clearCsv: () => void;
}

export const useCsvStore = create<CsvStore>((set) => ({
  data: [],
  headers: [],
  tableType: "flat",
  setCsv: (data, headers, type = "flat") =>
    set({ data, headers, tableType: type }),
  clearCsv: () => set({ data: [], headers: [] }),
}));
