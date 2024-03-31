import type { AppTableColumns, QualifyingResult } from "../Types";

export const columns: AppTableColumns<QualifyingResult> = [
  {
    columnKey: "position",
    label: "Position",
  },
  {
    columnKey: "Driver",
    label: "Driver",
  },
  {
    columnKey: "Constructor",
    label: "Constructor",
  },
  {
    columnKey: "Q1",
    label: "Q1",
  },
  {
    columnKey: "Q2",
    label: "Q2",
  },
  {
    columnKey: "Q3",
    label: "Q3",
  },
];
