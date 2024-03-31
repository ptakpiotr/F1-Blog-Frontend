import { Input, Label, Button, Text } from "@fluentui/react-components";
import { ChangeEvent, useCallback, useState } from "react";
import { LoginUser } from "../Types";

function Login() {
  const [loginState, setLoginState] = useState<LoginUser>({
    email: "",
    password: "",
  });

  const setEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setLoginState({
      ...loginState,
      email: e.target.value,
    });
  }, []);

  const setPassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setLoginState({
      ...loginState,
      password: e.target.value,
    });
  }, []);

  const handleClick = () => {
    // use mutation from React Query
    alert(JSON.stringify(loginState));
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
