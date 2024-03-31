import { Avatar, Title1 } from "@fluentui/react-components";
import styles from "./Header.module.scss";
import AppDrawer from "./AppDrawer";
import { useState } from "react";

function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const setOpenState = (newState: boolean) => {
    setIsOpen(newState);
  };

  return (
    <header className={styles.siteHeader}>
      <div className={styles.siteHeaderInfo}>
        <Avatar
          aria-label="Site logo"
          name="F 1"
          badge={{ status: "available" }}
          color="plum"
          size={48}
          activeAppearance="ring"
          onClick={() => setIsOpen(true)}
        />
        <AppDrawer isOpen={isOpen} setIsOpen={setOpenState} />
        <Title1 as="h1">F1 blog</Title1>
      </div>
      <div className=""></div>
    </header>
  );
}

export default Header;
