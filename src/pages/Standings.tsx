import { useContext } from "react";
import SeasonSearch from "../components/SeasonSearch";
import { SeasonContext } from "../App";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ConstructorStandings, DriverStandings } from "../Types";
import AppTable from "../components/AppTable";
import { columns as driverColumns } from "../renderers/DriverStandingsColumns";
import { columns as constructorColumns } from "../renderers/ConstructorStandingsColumns";
import DriverStandingsTabRenderer from "../renderers/DriverStandingsTabRenderer";
import { Title3 } from "@fluentui/react-components";
import ConstructorStandingsTabRenderer from "../renderers/ConstructorStandingsTabRenderer";

function Standings() {
  const { season } = useContext(SeasonContext);
  const {
    data: driverStandingsData,
    refetch: refetchDriverStandings,
    isLoading: driverIsLoading,
  } = useQuery({
    queryKey: ["driver-standings", season],
    queryFn: async ({ queryKey }) => {
      const data = await axios.get<DriverStandings>(
        `https://ergast.com/api/f1/${season}/driverStandings.json`
      );
      return data.data.MRData.StandingsTable;
    },
    enabled: false,
  });

  const {
    data: constructorStandingsData,
    refetch: refetchConstructorStandings,
    isLoading: constructorIsLoading,
  } = useQuery({
    queryKey: ["constructor-standings", season],
    queryFn: async ({ queryKey }) => {
      const data = await axios.get<ConstructorStandings>(
        `https://ergast.com/api/f1/${season}/constructorStandings.json`
      );
      return data.data.MRData.StandingsTable;
    },
    enabled: false,
  });

  const executeQuery = async () => {
    await refetchDriverStandings();
    await refetchConstructorStandings();
  };
  return (
    <main>
      <Title3 as="h3">Drivers & constructor standings</Title3>
      <SeasonSearch executeQuery={executeQuery} />
      <div className="standings-container">
        {driverStandingsData ? (
          <AppTable
            columns={driverColumns}
            items={driverStandingsData.StandingsLists[0].DriverStandings}
            renderer={DriverStandingsTabRenderer}
          />
        ) : (
          <></>
        )}
        {constructorStandingsData ? (
          <AppTable
            columns={constructorColumns}
            items={
              constructorStandingsData.StandingsLists[0].ConstructorStandings
            }
            renderer={ConstructorStandingsTabRenderer}
          />
        ) : (
          <></>
        )}
      </div>
    </main>
  );
}

export default Standings;
