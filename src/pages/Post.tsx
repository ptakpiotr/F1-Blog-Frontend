import {
  Title3,
  Image,
  useToastController,
  Toast,
  ToastBody,
  ToastTitle,
} from "@fluentui/react-components";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Markdown from "react-markdown";
import { useParams } from "react-router-dom";
import { IPost } from "../Types";
import { useEffect, useId } from "react";

function Post() {
  const { id } = useParams();

  const toasterId = useId();
  const { dispatchToast } = useToastController(toasterId);
  const notify = (error: string) =>
    dispatchToast(
      <Toast>
        <ToastTitle>An error occured while retrieving the post</ToastTitle>
        <ToastBody>{error}</ToastBody>
      </Toast>,
      { intent: "error", timeout: 3000 }
    );

  const {
    data: posts,
    isError,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      return axios.get<IPost[]>(`${import.meta.env.VITE_BACKEND_URL}/posts`);
    },
  });

  useEffect(() => {
    if (isError) {
      notify(error.message);
    }
  }, [isError]);

  const post = posts?.data.find((p) => p.id === parseInt(id ?? "-1"));

  return (
    <main>
      {post ? (
        <>
          <Title3 as="h3">{post?.title}</Title3>
          <Image src={post?.photo} width={"35%"} alt={"Test post"} />
          <Markdown>{`# ${post?.title} 
      ${post?.content}`}</Markdown>
        </>
      ) : (
        <>No post with given Id found</>
      )}
    </main>
  );
}

export default Post;
