import {
  Avatar,
  Textarea,
  Label,
} from "@fluentui/react-components";

import styles from "./SingleComment.module.scss";
import { ISingleComment } from "../Types";

interface IProps extends ISingleComment {
  changeLikes: (commentId: number) => void;
}

function SingleComment({ comment }: IProps) {
  return (
    <div className={styles.singleComment} style={{ padding: "1rem" }}>
      <div>
        <Avatar name={""} /> <Label>{""}</Label>
      </div>
      <Textarea value={comment} disabled={true} />
    </div>
  );
}

export default SingleComment;
