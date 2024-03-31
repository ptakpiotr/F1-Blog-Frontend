import type { AppTableColumns, ConstructorStanding } from "../Types";

export const columns: AppTableColumns<ConstructorStanding> = [
  {
    columnKey: "position",
    label: "Position",
  },
  {
    columnKey: "Constructor",
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
