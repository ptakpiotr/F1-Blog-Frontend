import { TableCell, TableRow } from "@fluentui/react-components";

import type { RaceResult } from "../Types";
import { Link } from "react-router-dom";

function RaceTabRenderer(item: RaceResult) {
  return (
    <TableRow key={`${item.Driver.driverId}`}>
      <TableCell>{item.position}</TableCell>
      <TableCell>
        <Link to={item.Driver.url}>
          {item.Driver.givenName} {item.Driver.familyName}
        </Link>
      </TableCell>
      <TableCell>
        <Link to={item.Constructor.url}>{item.Constructor.name}</Link>
      </TableCell>
      <TableCell>{item.laps}</TableCell>
      <TableCell>{item.grid}</TableCell>
      <TableCell>{item.points}</TableCell>
    </TableRow>
  );
}

export default RaceTabRenderer;
