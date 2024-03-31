import type { AppTableColumns, TabRace } from "../Types";

export const columns: AppTableColumns<TabRace> = [
  {
    columnKey: "round",
    label: "Round",
  },
  {
    columnKey: "raceName",
    label: "Wikipedia",
  },
  {
    columnKey: "date",
    label: "Date",
  },
  {
    columnKey: "circuitName",
    label: "Circuit",
  },
  {
    columnKey: "country",
    label: "Country",
  },
];
