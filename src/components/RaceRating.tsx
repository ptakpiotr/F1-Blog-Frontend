import { useMemo, useState } from "react";
import type { RaceRating as RaceRatingProps } from "../validation";
import Enumerable from "linq";
import RaceStar from "./RaceStar";

type Props = RaceRatingProps;

function RaceRating({ raceId, rating }: Props) {
  const [goldStars, setGoldStars] = useState<number>(rating);

  const starsToRenderInGold = useMemo(
    () => Enumerable.range(0, goldStars).toArray(),
    [goldStars]
  );

  const starsToRenderEmpty = useMemo(
    () => Enumerable.range(0, 5 - goldStars).toArray(),
    [goldStars]
  );

  const setRating = (rating: number) => {
    setGoldStars(rating);
    //perform call to db -> save rating
  };

  return (
    <div>
      {starsToRenderInGold.map((s) => (
        <RaceStar
          key={`rating-${s}`}
          currentRating={s}
          isGold={true}
          setRating={setRating}
        />
      ))}

      {starsToRenderEmpty.map((s) => (
        <RaceStar
          key={`rating-${s + goldStars}`}
          currentRating={s + goldStars}
          isGold={false}
          setRating={setRating}
        />
      ))}
    </div>
  );
}

export default RaceRating;
