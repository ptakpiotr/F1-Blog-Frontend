import { Button } from "@fluentui/react-components";
import { useCallback, useContext } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

function Logout() {
  const { setUserState } = useContext(UserContext);
  const navigate = useNavigate();

  const onClick = useCallback(() => {
    if (setUserState) {
      setUserState({
        isLoggedIn: false,
        userId: "",
      });

      localStorage.removeItem("token");
      navigate("/");
    }
  }, []);

  return (
    <Button appearance="secondary" onClick={onClick}>
      Logout
    </Button>
  );
}

export default Logout;
