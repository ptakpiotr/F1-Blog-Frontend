import {
  Body1,
  Card,
  CardFooter,
  CardHeader,
  CardPreview,
  Image,
} from "@fluentui/react-components";
import { IPost } from "../Types";
import { useNavigate } from "react-router-dom";

type Props = IPost;

function SmallPost({ postId, authorName, title, photo }: Props) {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => {
        navigate(`/post/${postId}`);
      }}
      style={{
        padding: "2rem",
        margin: "1rem",
      }}
    >
      <CardHeader header={<Body1>{title}</Body1>} />
      <CardPreview>
        <Image src={photo} fit="cover" shape="rounded" />
      </CardPreview>
      <CardFooter>by {authorName}</CardFooter>
    </Card>
  );
}

export default SmallPost;
