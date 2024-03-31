import {
  Input,
  Label,
  Button,
  Text,
  Checkbox,
  MessageBar,
} from "@fluentui/react-components";
import { ChangeEvent, useCallback, useState } from "react";
import { registerUserSchema, RegisterUser } from "../validation";
import { IErrorState } from "../Types";
import { ValidationError } from "yup";

function Register() {
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

  const setStateValue = useCallback(
    (
      e: ChangeEvent<HTMLInputElement>,
      k: keyof Omit<RegisterUser, "isRobot">
    ) => {
      setRegisterState({
        ...registerState,
        [k]: e.target.value,
      });
    },
    []
  );

  const handleClick = async () => {
    try {
      await registerUserSchema.validate(registerState);

      // use mutation from React Query
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
    alert(JSON.stringify(registerState));
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
          disabled={registerState.isRobot || !errorState.isError}
        >
          Register
        </Button>
      </div>
      {errorState.isError ? (
        <MessageBar intent="error">{errorState.content}</MessageBar>
      ) : (
        <></>
      )}
    </main>
  );
}

export default Register;
