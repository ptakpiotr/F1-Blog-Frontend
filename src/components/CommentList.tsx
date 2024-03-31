import { useEffect, useState } from "react";
import SingleComment from "./SingleComment";
import type { ISingleComment } from "../Types";
import styles from "./CommentList.module.scss";
import { Field, Label, Switch } from "@fluentui/react-components";
import Enumerable from "linq";

const propsArray: ISingleComment[] = [
  {
    commentId: "comment1",
    userId: "user123",
    comment: "Great post!",
    author: "Alice",
    likes: 10,
    currentlyLikes: true,
  },
  {
    commentId: "comment2",
    userId: "user456",
    comment: "Interesting insights.",
    author: "Bob",
    likes: 5,
    currentlyLikes: false,
  },
  {
    commentId: "comment3",
    userId: "user123",
    comment: "Great post!",
    author: "Alice",
    likes: 10,
    currentlyLikes: true,
  },
  {
    commentId: "comment4",
    userId: "user456",
    comment: "Interesting insights.",
    author: "Bob",
    likes: 5,
    currentlyLikes: false,
  },
  {
    commentId: "comment5",
    userId: "user123",
    comment: "Great post!",
    author: "Alice",
    likes: 10,
    currentlyLikes: true,
  },
  {
    commentId: "comment26",
    userId: "user456",
    comment: "Interesting insights.",
    author: "Bob",
    likes: 5,
    currentlyLikes: false,
  },
  {
    commentId: "comment1123",
    userId: "user123",
    comment: "Great post!",
    author: "Alice",
    likes: 10,
    currentlyLikes: true,
  },
  {
    commentId: "comment1232",
    userId: "user456",
    comment: "Interesting insights.",
    author: "Bob",
    likes: 5,
    currentlyLikes: false,
  },
];

function CommentList() {
  //TODO: get comments (useQuery)
  const [comments, setComments] = useState<ISingleComment[]>(propsArray);
  const [orderByDescending, setOrderByDescending] = useState<boolean>(false);

  useEffect(() => {
    const orderedComments = Enumerable.from(comments)
      .orderBy((c) => c.likes * (orderByDescending ? -1 : 1))
      .toArray();
    setComments(orderedComments);
  }, [orderByDescending]);

  return (
    <div>
      <div>
        <Label>Order descending by likes</Label>
        <Switch
          checked={orderByDescending}
          onChange={() => {
            setOrderByDescending(!orderByDescending);
          }}
        />
      </div>
      <div className={styles.commentList}>
        {comments.map((c) => (
          <SingleComment key={c.commentId} changeLikes={() => {}} {...c} />
        ))}
      </div>
    </div>
  );
}

export default CommentList;
