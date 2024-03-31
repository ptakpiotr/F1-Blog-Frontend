import { Combobox, Label, Option } from "@fluentui/react-components";
import Enumerable from "linq";

interface IProps {
  chosenSeason: string;
  setSeason: (newSeason: string) => void;
}

const seasons = Enumerable.range(
  1980,
  parseInt(import.meta.env.VITE_CURRENT_SEASON ?? "2024") - 1979
)
  .select((v) => v.toString())
  .toArray();

function SeasonPicker({ chosenSeason, setSeason }: IProps) {
  return (
    <div>
      <Label htmlFor="season-picker">Choose season:</Label>
      <br />
      <Combobox
        id="season-picker"
        onOptionSelect={(_, data) => {
          setSeason(data.optionValue ?? import.meta.env.VITE_CURRENT_SEASON);
        }}
        value={chosenSeason}
      >
        {seasons.map((s) => (
          <Option key={s} value={s}>
            {s}
          </Option>
        ))}
      </Combobox>
    </div>
  );
}

export default SeasonPicker;
