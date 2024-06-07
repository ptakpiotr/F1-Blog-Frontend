import SingleComment from "./SingleComment";
import type { ISingleComment } from "../Types";
import styles from "./CommentList.module.scss";

interface IProps {
  wsComments: ISingleComment[];
}

function CommentList({ wsComments }: IProps) {
  return (
    <div>
      <div className={styles.commentList}>
        {wsComments.map((c) => (
          <SingleComment key={c.id} changeLikes={() => {}} {...c} />
        ))}
      </div>
    </div>
  );
}

export default CommentList;
