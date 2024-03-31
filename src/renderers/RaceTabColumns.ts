import type { AppTableColumns, RaceResult } from "../Types";

export const columns: AppTableColumns<RaceResult> = [
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
    columnKey: "laps",
    label: "Laps",
  },
  {
    columnKey: "grid",
    label: "Grid position",
  },
  {
    columnKey: "points",
    label: "Points",
  },
];
