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
import { IAddPost } from "../Types";
import { UserContext } from "../App";
import { addPostSchema } from "../validation";
import { ValidationError } from "yup";

interface IProps {
  isOpen: boolean;
  closeDialog: () => void;
}

function AddPost({ isOpen, closeDialog }: IProps) {
  //TODO: useMutation
  const { userState } = useContext(UserContext);

  const [post, setPost] = useState<IAddPost>({
    authorId: userState?.userId!,
    content: "",
    photo: "",
    title: "",
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

  const addPost = async () => {
    try {
      await addPostSchema.validate(post);
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
