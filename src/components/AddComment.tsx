import { useState } from "react";
import { Button, Field, Label, Textarea } from "@fluentui/react-components";
import { Add16Regular } from "@fluentui/react-icons";
import styles from "./AddComment.module.scss";

interface IProps {
  addComment: (comment: string) => void;
}

const MAX_LENGTH = 250;

function AddComment({ addComment }: IProps) {
  const [comment, setComment] = useState<string>("");

  const setCommentValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  return (
    <div>
      <Field label="Add comment">
        <Textarea
          className={styles.addCommentArea}
          resize="none"
          size="large"
          maxLength={MAX_LENGTH}
          onChange={setCommentValue}
          value={comment}
        />
      </Field>
      <div className={styles.actionArea}>
        <Button
          appearance="primary"
          icon={<Add16Regular />}
          onClick={() => {
            addComment(comment);
            setComment("");
          }}
          disabled={comment.length > 250}
        >
          Add
        </Button>
        <Label>{250 - comment.length} characters left</Label>
      </div>
    </div>
  );
}

export default AddComment;
