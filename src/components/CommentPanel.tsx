import AddComment from "./AddComment";
import CommentList from "./CommentList";

interface IProps {
  raceId: string;
}

export function CommentPanel({ raceId }: IProps) {
  return (
    <div>
      <AddComment raceId={raceId} userId="" />
      <CommentList />
    </div>
  );
}
