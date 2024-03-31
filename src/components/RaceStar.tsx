import { Star16Filled } from "@fluentui/react-icons";

interface IProps {
  currentRating: number;
  isGold: boolean;
  setRating: (rating: number) => void;
}

function RaceStar({ currentRating, setRating, isGold }: IProps) {
  const setCurrentRating = () => {
    setRating(currentRating);
  };

  return (
    <Star16Filled
      color={isGold ? "gold" : "darkslategray"}
      onMouseEnter={setCurrentRating}
    />
  );
}

export default RaceStar;
