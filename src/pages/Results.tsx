import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { SeasonContext } from "../App";
import SeasonSearch from "../components/SeasonSearch";
import axios from "axios";
import { ResultsData } from "../Types";
import AppTable from "../components/AppTable";
import ResultsTabRenderer from "../renderers/ResultsTabRenderer";
import { columns } from "../renderers/ResultsTabColumns";

function Results() {
  const { season } = useContext(SeasonContext);
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["season", season],
    queryFn: async ({ queryKey }) => {
      const data = await axios.get<ResultsData>(
        `https://ergast.com/api/f1/${queryKey[1]}.json`
      );
      return data.data.MRData.RaceTable;
    },
    enabled: false,
  });

  const executeQuery = async () => {
    await refetch();
  };

  return (
    <main>
      <SeasonSearch executeQuery={executeQuery} />
      {data ? (
        <AppTable
          columns={columns}
          items={data.Races.map((dt) => ({
            ...dt,
            country: dt.Circuit.Location.country,
            circuitName: dt.Circuit.circuitName,
          }))}
          renderer={ResultsTabRenderer}
        />
      ) : (
        <></>
      )}
    </main>
  );
}

export default Results;
