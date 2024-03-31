import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ArrowStepBack20Regular } from "@fluentui/react-icons";
import type { QualiRes } from "../Types";
import AppTable from "../components/AppTable";
import { columns } from "../renderers/QualiTabColumns";
import QualiTabRenderer from "../renderers/QualiTabRenderer";
import { Title3, Tooltip } from "@fluentui/react-components";

function Quali() {
  const { season, round } = useParams();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["quali", season, round],
    queryFn: async ({}) => {
      const data = await axios.get<QualiRes>(
        `https://ergast.com/api/f1/${season}/${round}/qualifying.json`
      );
      return data.data.MRData.RaceTable;
    },
  });

  const goBack = () => {
    navigate(-1);
  };

  return (
    <main>
      {data ? (
        <>
          <Title3 as="h3">
            <Tooltip content="Go back" relationship="label">
              <ArrowStepBack20Regular onClick={goBack} cursor="pointer" />
            </Tooltip>{" "}
            {season} {data?.Races[0]?.raceName} Qualifying
          </Title3>
          <div className="quali-res">
            <AppTable
              columns={columns}
              items={data.Races[0].QualifyingResults}
              renderer={QualiTabRenderer}
            />
          </div>
        </>
      ) : (
        <></>
      )}
    </main>
  );
}

export default Quali;
