import {
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
} from "@fluentui/react-components";
import {
  Home24Regular,
  Person24Regular,
  PersonAdd24Regular,
  Dismiss24Regular,
  Table24Regular,
  Person24Filled,
} from "@fluentui/react-icons";
import AppDrawerItem from "./AppDrawerItem";
import { useCallback, useContext } from "react";
import { UserContext } from "../App";

interface IProps {
  isOpen: boolean;
  setIsOpen: (newOpen: boolean) => void;
}

function AppDrawer({ isOpen, setIsOpen }: IProps) {
  const { userState } = useContext(UserContext);

  const closeDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <Drawer
      type="overlay"
      separator
      open={isOpen}
      onOpenChange={(_, { open }) => {
        setIsOpen(open);
      }}
    >
      <DrawerHeader>
        <DrawerHeaderTitle
          action={
            <Button
              appearance="subtle"
              aria-label="Close"
              icon={<Dismiss24Regular />}
              onClick={() => {
                setIsOpen(false);
              }}
            />
          }
        >
          Menu
        </DrawerHeaderTitle>
      </DrawerHeader>
      <DrawerBody>
        <ul
          style={{
            listStyleType: "none",
          }}
        >
          <AppDrawerItem
            url={"/"}
            desc={"Home"}
            Icon={Home24Regular}
            closeDrawer={closeDrawer}
          />
          {!userState?.isLoggedIn && (
            <>
              <AppDrawerItem
                url={"/login"}
                desc={"Login"}
                Icon={Person24Regular}
                closeDrawer={closeDrawer}
              />
              <AppDrawerItem
                url={"/register"}
                desc={"Register"}
                Icon={PersonAdd24Regular}
                closeDrawer={closeDrawer}
              />
            </>
          )}
          <AppDrawerItem
            url={"/results"}
            desc={"Results"}
            Icon={Table24Regular}
            closeDrawer={closeDrawer}
          />
          <AppDrawerItem
            url={"/standings"}
            desc={"Standings"}
            Icon={Person24Filled}
            closeDrawer={closeDrawer}
          />
        </ul>
      </DrawerBody>
    </Drawer>
  );
}

export default AppDrawer;
