import {
  Input,
  Label,
  Button,
  Text,
  MessageBar,
} from "@fluentui/react-components";
import { ChangeEvent, useCallback, useContext, useState } from "react";
import {
  IErrorState,
  IGeneralResponse,
  IJwtResponsePayload,
  LoginUser,
} from "../Types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

function Login() {
  const { setUserState } = useContext(UserContext);

  const [loginState, setLoginState] = useState<LoginUser>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const setEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setLoginState((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  }, []);

  const setPassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setLoginState((prev) => ({
      ...prev,
      password: e.target.value,
    }));
  }, []);

  const [errorState, setErrorState] = useState<IErrorState>({
    isError: false,
    content: "",
  });

  const { mutateAsync } = useMutation({
    mutationKey: ["login"],
    mutationFn: (user: LoginUser) => {
      return axios.post<IGeneralResponse>(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        {
          email: user.email,
          password: user.password,
        }
      );
    },
    onError: (err) => {
      setErrorState({
        isError: true,
        content: err.message,
      });
    },
    onSuccess: (data) => {
      if (data.status === 200) {
        const token = data.data.message;
        localStorage.setItem("token", token);
        
        const decodedToken = jwtDecode<IJwtResponsePayload>(token);

        if (setUserState) {
          setUserState({
            isLoggedIn: true,
            userId: decodedToken.userId?.toString(),
          });
        }
        navigate("/");
      }

      return "";
    },
  });

  const handleClick = async () => {
    await mutateAsync(loginState);
  };

  return (
    <main>
      <Text size={600}>Login</Text>
      <div className="user-form">
        <div>
          <Label htmlFor="email-inp">Email: </Label>
          <Input
            id="email-inp"
            placeholder="your-email@outlook.com"
            appearance="filled-lighter-shadow"
            onChange={setEmail}
          />
        </div>
        <div>
          <Label htmlFor="password-inp">Password: </Label>
          <Input
            id="password-inp"
            type="password"
            placeholder="Password"
            appearance="filled-lighter-shadow"
            onChange={setPassword}
          />
        </div>
        <Button appearance="primary" onClick={handleClick}>
          Login
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

export default Login;
