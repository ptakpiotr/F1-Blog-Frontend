import { Link as FluentLink } from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import type { FluentIcon } from "@fluentui/react-icons";
import styles from "./AppDrawerItem.module.scss";

interface IProps {
  url: string;
  desc: string;
  Icon: FluentIcon;
  closeDrawer: () => void;
}

function AppDrawerItem({ url, desc, Icon, closeDrawer }: IProps) {
  const navigate = useNavigate();

  const onNavigateClick = () => {
    navigate(url);
    closeDrawer();
  };

  return (
    <li>
      <FluentLink className={styles.drawerItem} onClick={onNavigateClick}>
        <Icon />
        {desc}
      </FluentLink>
    </li>
  );
}

export default AppDrawerItem;
