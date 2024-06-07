import { useQuery } from "@tanstack/react-query";
import { IPost } from "../Types";
import SmallPost from "../components/SmallPost";
import axios from "axios";
import { useEffect, useId } from "react";
import {
  Spinner,
  Toast,
  ToastBody,
  ToastTitle,
  useToastController,
} from "@fluentui/react-components";

function Posts() {
  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      return axios.get<IPost[]>(`${import.meta.env.VITE_BACKEND_URL}/posts`);
    },
  });

  const toasterId = useId();
  const { dispatchToast } = useToastController(toasterId);
  const notify = (error: string) =>
    dispatchToast(
      <Toast>
        <ToastTitle>Validation error occured</ToastTitle>
        <ToastBody subtitle="Correct the issues">{error}</ToastBody>
      </Toast>,
      { intent: "error", timeout: 3000 }
    );

  useEffect(() => {
    if (isError) {
      notify(error.message);
    }
  }, [isError]);

  return (
    <main
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {!isError &&
        !isLoading &&
        posts?.data?.map((p) => <SmallPost key={p.id} {...p} />)}
      {isLoading && <Spinner appearance="primary" />}
    </main>
  );
}

export default Posts;
