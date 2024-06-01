import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
  Field,
  Input,
  Textarea,
  useToastController,
  Toast,
  ToastTitle,
  ToastBody,
  Toaster,
} from "@fluentui/react-components";
import { useContext, useId, useState } from "react";
import { IAddPost, IGeneralResponse } from "../Types";
import { UserContext } from "../App";
import { addPostSchema } from "../validation";
import { ValidationError } from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface IProps {
  isOpen: boolean;
  closeDialog: () => void;
}

function AddPost({ isOpen, closeDialog }: IProps) {
  const { userState } = useContext(UserContext);
  const queryClient = useQueryClient();

  const toasterId = useId();
  const { dispatchToast } = useToastController(toasterId);
  const notify = (error: string) =>
    dispatchToast(
      <Toast>
        <ToastTitle>An error occured while fetching posts</ToastTitle>
        <ToastBody subtitle="Contact the admin">{error}</ToastBody>
      </Toast>,
      { intent: "error", timeout: 3000 }
    );

  const { mutateAsync } = useMutation({
    mutationKey: ["add-post"],
    mutationFn: (post: IAddPost) => {
      const token = localStorage.getItem("token");

      return axios.post<IGeneralResponse>(
        `${import.meta.env.VITE_BACKEND_URL}/posts`,
        {
          ...post,
          userId: parseInt(post.authorId),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onError: (err) => {
      notify(err.message);
    },
    onSuccess: async (_) => {
      await queryClient.refetchQueries({
        queryKey: ["posts"],
      });
    },
  });

  const [post, setPost] = useState<IAddPost>({
    authorId: userState?.userId!,
    content: "",
    photo: "",
    title: "",
  });

  const addPost = async () => {
    try {
      await addPostSchema.validate(post);
      await mutateAsync(post);
      closeDialog();
    } catch (err) {
      const validErr = err as ValidationError;
      notify(validErr.message);
    }
  };

  const setPostValue = (valKey: keyof IAddPost, newValue: string) => {
    setPost({
      ...post,
      [valKey]: newValue,
    });
  };

  return (
    <Dialog open={isOpen}>
      <Toaster toasterId={toasterId} />
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Dialog title</DialogTitle>
          <DialogContent>
            <Field label="Photo URL">
              <Input
                type="url"
                onChange={(e) => {
                  setPostValue("photo", e.target.value);
                }}
              />
            </Field>
            <Field label="Title">
              <Input
                type="text"
                onChange={(e) => {
                  setPostValue("title", e.target.value);
                }}
              />
            </Field>
            <Field label="Content">
              <Textarea
                onChange={(e) => {
                  setPostValue("content", e.target.value);
                }}
              />
            </Field>
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary" onClick={closeDialog}>
                Close
              </Button>
            </DialogTrigger>
            <Button appearance="primary" onClick={addPost}>
              Add
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}

export default AddPost;
