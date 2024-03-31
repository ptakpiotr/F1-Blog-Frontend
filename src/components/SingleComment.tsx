import {
  Avatar,
  CounterBadge,
  Textarea,
  Button,
  Label,
} from "@fluentui/react-components";

import { Add24Filled, Delete24Filled } from "@fluentui/react-icons";
import styles from "./SingleComment.module.scss";
import { ISingleComment } from "../Types";

interface IProps extends ISingleComment {
  changeLikes: (commentId: string) => void;
}

function SingleComment({
  commentId,
  comment,
  author,
  likes,
  changeLikes,
  currentlyLikes,
}: IProps) {
  const changeCommentLikes = () => {
    changeLikes(commentId);
  };

  return (
    <div className={styles.singleComment}>
      <div>
        <Avatar name={author} /> <Label>{author}</Label>
      </div>
      <Textarea value={comment} disabled={true} />
      <div className={styles.actionArea}>
        <Button
          appearance="transparent"
          shape="rounded"
          icon={<Add24Filled />}
          onClick={changeCommentLikes}
          disabled={currentlyLikes}
        ></Button>
        <Button
          appearance="transparent"
          shape="rounded"
          icon={<Delete24Filled />}
          onClick={changeCommentLikes}
          disabled={!currentlyLikes}
        ></Button>
        <CounterBadge appearance="filled" count={likes} />
      </div>
    </div>
  );
}

export default SingleComment;
