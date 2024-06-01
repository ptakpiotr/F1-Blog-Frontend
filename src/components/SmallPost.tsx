import {
  Body1,
  Card,
  CardHeader,
  CardPreview,
  Image,
} from "@fluentui/react-components";
import { IPost } from "../Types";
import { useNavigate } from "react-router-dom";
import style from "./SmallPost.module.scss";

type Props = IPost;

function SmallPost({ id, title, photo }: Props) {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => {
        navigate(`/post/${id}`);
      }}
      className={style.smallPost}
    >
      <CardHeader header={<Body1>{title}</Body1>} />
      <CardPreview>
        <Image src={photo} fit="cover" shape="rounded" />
      </CardPreview>
    </Card>
  );
}

export default SmallPost;
