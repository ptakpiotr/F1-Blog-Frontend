import { Input, Label, Button, Text } from "@fluentui/react-components";
import { ChangeEvent, useCallback, useContext, useState } from "react";
import { IGeneralResponse, LoginUser } from "../Types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
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
    onSuccess: (data) => {
      if (data.status === 200) {
        const token = data.data.message;
        localStorage.setItem("token", token);
        if (setUserState) {
          setUserState({ isLoggedIn: true, userId: token });
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
    </main>
  );
}

export default Login;
