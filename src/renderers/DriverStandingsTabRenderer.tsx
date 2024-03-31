import { TableCell, TableRow } from "@fluentui/react-components";

import type { DriverStanding } from "../Types";
import { Link } from "react-router-dom";

function DriverStandingsTabRenderer(item: DriverStanding) {
  return (
    <TableRow key={`${item.Driver.driverId}`}>
      <TableCell>{item.position}</TableCell>
      <TableCell>
        <Link to={item.Driver.url}>
          {item.Driver.givenName} {item.Driver.familyName}
        </Link>
      </TableCell>
      <TableCell>
        {item.Constructors.map((c) => (
          <Link key={`${item.Driver.driverId}-${c.name}`} to={c.url}>
            {c.name}
          </Link>
        ))}
      </TableCell>
      <TableCell>{item.points}</TableCell>
      <TableCell>{item.wins}</TableCell>
    </TableRow>
  );
}

export default DriverStandingsTabRenderer;
