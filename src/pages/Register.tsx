import {
  Input,
  Label,
  Button,
  Text,
  Checkbox,
  MessageBar,
} from "@fluentui/react-components";
import { ChangeEvent, useCallback, useContext, useState } from "react";
import { registerUserSchema, RegisterUser } from "../validation";
import { IErrorState, IGeneralResponse } from "../Types";
import { ValidationError } from "yup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

function Register() {
  const { setUserState } = useContext(UserContext);

  const [registerState, setRegisterState] = useState<RegisterUser>({
    email: "",
    password: "",
    confirmPassword: "",
    isRobot: true,
  });

  const [errorState, setErrorState] = useState<IErrorState>({
    isError: false,
    content: "",
  });

  const navigate = useNavigate();

  const setStateValue = useCallback(
    (
      e: ChangeEvent<HTMLInputElement>,
      k: keyof Omit<RegisterUser, "isRobot">
    ) => {
      setRegisterState((prev) => ({
        ...prev,
        [k]: e.target.value,
      }));
    },
    []
  );

  const { mutateAsync } = useMutation({
    mutationKey: ["register"],
    mutationFn: (user: Omit<RegisterUser, "isRobot">) => {
      return axios.post<IGeneralResponse>(
        `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
        {
          email: user.email,
          password: user.password,
          confirmedPassword: user.confirmPassword,
        }
      );
    },
    onSuccess: (data) => {
      if (data.status === 201) {
        const token = data.data.message;
        localStorage.setItem("token", token);
        if (setUserState) {
          setUserState({ isLoggedIn: true, userId: token });
        }
        navigate("/");
      }
    },
  });

  const handleClick = async () => {
    try {
      await registerUserSchema.validate(registerState);

      await mutateAsync(registerState);

      setErrorState({
        content: "",
        isError: false,
      });
    } catch (err) {
      const validErr = err as ValidationError;
      setErrorState({
        content: validErr.message,
        isError: true,
      });
    }
  };

  return (
    <main>
      <Text size={600}>Register</Text>
      <div className="user-form">
        <div>
          <Label htmlFor="email-inp">Email: </Label>
          <Input
            id="email-inp"
            placeholder="your-email@outlook.com"
            appearance="filled-lighter-shadow"
            onChange={(e) => {
              setStateValue(e, "email");
            }}
          />
        </div>
        <div>
          <Label htmlFor="password-inp">Password: </Label>
          <Input
            id="password-inp"
            type="password"
            placeholder="Password"
            appearance="filled-lighter-shadow"
            onChange={(e) => {
              setStateValue(e, "password");
            }}
          />
        </div>
        <div>
          <Label htmlFor="confirm-password-inp">Confirm: </Label>
          <Input
            id="confirm-password-inp"
            type="password"
            placeholder="Confirm password"
            appearance="filled-lighter-shadow"
            onChange={(e) => {
              setStateValue(e, "confirmPassword");
            }}
          />
        </div>
        <div>
          <Label htmlFor="is-robot-inp">I am robot: </Label>
          <Checkbox
            id="is-robot-inp"
            checked={registerState.isRobot}
            onChange={(e) => {
              setRegisterState({
                ...registerState,
                isRobot: e.target.checked,
              });
            }}
          />
        </div>
        <Button
          appearance="primary"
          onClick={handleClick}
          disabled={registerState.isRobot || errorState.isError}
        >
          Register
        </Button>
      </div>
      {errorState.isError ? (
        <MessageBar
          intent="error"
          style={{
            cursor: "pointer",
          }}
          onClick={() => {
            setErrorState({ isError: false, content: "" });
          }}
        >
          {errorState.content}
        </MessageBar>
      ) : (
        <></>
      )}
    </main>
  );
}

export default Register;
