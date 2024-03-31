import { useContext } from "react";
import { Button } from "@fluentui/react-components";
import { Search12Regular } from "@fluentui/react-icons";
import { SeasonContext } from "../App";
import SeasonPicker from "./SeasonPicker";
import styles from "./SeasonSearch.module.scss";

interface IProps {
  executeQuery: () => void;
}

function SeasonSearch({ executeQuery }: IProps) {
  const { season, setSeason: setSeasonContext } = useContext(SeasonContext);

  const setSeason = (newSeason: string) => {
    if (setSeasonContext) {
      setSeasonContext(newSeason);
    }
  };

  const executeSearchQuery = () => {
    executeQuery();
  };

  return (
    <div className={styles.seasonSearch}>
      <SeasonPicker chosenSeason={season!} setSeason={setSeason} />
      <Button
        appearance="primary"
        onClick={executeSearchQuery}
        icon={<Search12Regular />}
      >
        Search
      </Button>
    </div>
  );
}

export default SeasonSearch;
