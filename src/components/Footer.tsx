import { useContext, useState } from "react";
import styles from "./Footer.module.scss";
import { UserContext } from "../App";
import { Button } from "@fluentui/react-components";
import { Add16Regular } from "@fluentui/react-icons";
import AddPost from "./AddPost";
import Logout from "./Logout";
import { Link } from "react-router-dom";

function Footer() {
  const { userState } = useContext(UserContext);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <footer className={styles.footer}>
      <span>Created by Piotr Ptak - {new Date().getFullYear()}</span>
      {userState?.isLoggedIn && userState?.userId ? (
        <div className="btn-group">
          <Logout />

          <Button
            appearance="primary"
            icon={<Add16Regular />}
            onClick={() => {
              setIsDialogOpen(true);
            }}
          >
            Add post
          </Button>
          <AddPost closeDialog={closeDialog} isOpen={isDialogOpen} />
        </div>
      ) : (
        <div className="btn-group">
          <Link to="Login">Login</Link>
          <Link to="Register">Register</Link>
        </div>
      )}
    </footer>
  );
}

export default Footer;
