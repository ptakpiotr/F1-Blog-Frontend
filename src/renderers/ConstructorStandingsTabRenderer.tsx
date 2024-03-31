import { TableCell, TableRow } from "@fluentui/react-components";

import type { ConstructorStanding } from "../Types";
import { Link } from "react-router-dom";

function ConstructorStandingsTabRenderer(item: ConstructorStanding) {
  return (
    <TableRow key={`${item.Constructor.name}`}>
      <TableCell>{item.position}</TableCell>
      <TableCell>
        <Link to={item.Constructor.url}>{item.Constructor.name}</Link>
      </TableCell>
      <TableCell>{item.points}</TableCell>
      <TableCell>{item.wins}</TableCell>
    </TableRow>
  );
}

export default ConstructorStandingsTabRenderer;
