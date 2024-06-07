import { memo } from "react";
import AddComment from "./AddComment";
import CommentList from "./CommentList";
import { ISingleComment } from "../Types";

interface IProps {
  addComment: (comment: string) => void;
  comments: ISingleComment[];
}

export const CommentPanel = memo(function CommentPanel({
  addComment,
  comments,
}: IProps) {
  return (
    <div>
      <AddComment addComment={addComment} />
      <CommentList wsComments={comments} />
    </div>
  );
});
