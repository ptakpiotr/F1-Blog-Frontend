import { useContext, useState } from "react";
import styles from "./Footer.module.scss";
import { UserContext } from "../App";
import { Button } from "@fluentui/react-components";
import { Add16Regular } from "@fluentui/react-icons";
import AddPost from "./AddPost";

function Footer() {
  const { userState } = useContext(UserContext);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <footer className={styles.footer}>
      <span>Created by Piotr Ptak - {new Date().getFullYear()}</span>
      {userState?.isLoggedIn && userState?.userId && (
        <>
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
        </>
      )}
    </footer>
  );
}

export default Footer;
