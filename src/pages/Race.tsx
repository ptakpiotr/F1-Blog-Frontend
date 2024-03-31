import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { RaceRes } from "../Types";
import AppTable from "../components/AppTable";
import { columns } from "../renderers/RaceTabColumns";
import RaceTabRenderer from "../renderers/RaceTabRenderer";
import { Label, Title3, Tooltip } from "@fluentui/react-components";
import { Open24Regular } from "@fluentui/react-icons";
import RaceRating from "../components/RaceRating";
import { CommentPanel } from "../components/CommentPanel";

function Race() {
  const { season, round } = useParams();
  const raceId = `race-${season}-${round}`;

  const { data, error, isLoading } = useQuery({
    queryKey: ["race", season, round],
    queryFn: async ({ queryKey }) => {
      const data = await axios.get<RaceRes>(
        `https://ergast.com/api/f1/${season}/${round}/results.json`
      );
      return data.data.MRData.RaceTable;
    },
  });
  return (
    <main className="main-race">
      <div className="race-info">
        <Title3 as="h3">
          {data?.season} {data?.Races[0].raceName}{" "}
          <Tooltip content="Open quali results" relationship="label">
            <Link to={`/quali/${season}/${round}`}>
              <Open24Regular />
            </Link>
          </Tooltip>
        </Title3>
        <div className="race-table">
          {data ? (
            <AppTable
              columns={columns}
              items={data.Races[0].Results}
              renderer={RaceTabRenderer}
            />
          ) : (
            <></>
          )}
        </div>
        <div>
          <Label>Rate the race: </Label>
          <RaceRating raceId={raceId} rating={3} />
        </div>
      </div>
      <div className="race-discussion">
        <CommentPanel raceId={raceId} />
      </div>
    </main>
  );
}

export default Race;
