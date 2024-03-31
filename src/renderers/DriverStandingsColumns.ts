import type { AppTableColumns, DriverStanding } from "../Types";

export const columns: AppTableColumns<DriverStanding> = [
  {
    columnKey: "position",
    label: "Position",
  },
  {
    columnKey: "Driver",
    label: "Driver",
  },
  {
    columnKey: "Constructors",
    label: "Constructor",
  },
  {
    columnKey: "points",
    label: "Points",
  },
  {
    columnKey: "wins",
    label: "Wins",
  },
];
