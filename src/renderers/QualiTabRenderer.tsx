import { TableCell, TableRow } from "@fluentui/react-components";

import type { QualifyingResult } from "../Types";
import { Link } from "react-router-dom";

function QualiTabRenderer(item: QualifyingResult) {
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
      <TableCell>{item.Q1}</TableCell>
      <TableCell>{item.Q2}</TableCell>
      <TableCell>{item.Q3}</TableCell>
    </TableRow>
  );
}

export default QualiTabRenderer;
