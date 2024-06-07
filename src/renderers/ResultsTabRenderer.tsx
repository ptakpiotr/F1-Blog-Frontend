import { TableCell, TableRow } from "@fluentui/react-components";
import { Open16Regular } from "@fluentui/react-icons";
import { Link, useNavigate } from "react-router-dom";
import Flag from "react-world-flags";

import type { TabRace } from "../Types";

function ResultsTabRenderer(item: TabRace) {
  const navigate = useNavigate();

  const goToRace = () => {
    navigate(`/race/${item.season}/${item.round}`);
  };

  return (
    <TableRow key={`${item.url}`}>
      <TableCell>{item.round}</TableCell>
      <TableCell>
        <Link to={item.url}>{item.raceName}</Link>
      </TableCell>
      <TableCell>{item.date.toString()}</TableCell>
      <TableCell>{item.circuitName}</TableCell>
      <TableCell>
        <Flag
          code={item.country.substring(0, 3)}
          style={{ maxWidth: "2rem" }}
        />
      </TableCell>
      <TableCell>
        <Open16Regular cursor="pointer" onClick={goToRace} />
      </TableCell>
    </TableRow>
  );
}

export default ResultsTabRenderer;
