import { Drawer } from '@mui/material';

import styles from './index.module.css';
import RootLayoutMenuRender, { MenuItemType } from './RootLayoutMenuRender';

interface RootLayoutSidebarProps {
  menuItems: MenuItemType[];
  isSidebarOpen: boolean;
  onCloseSidebar: () => void;
}

const RootLayoutSidebar = ({
  menuItems,
  isSidebarOpen,
  onCloseSidebar,
}: RootLayoutSidebarProps) => {
  return (
    <Drawer open={isSidebarOpen} anchor="right" onClose={onCloseSidebar}>
      <div className={styles.rootSidebarPaper}>
        <RootLayoutMenuRender menuItems={menuItems} />
      </div>
    </Drawer>
  );
};
export default RootLayoutSidebar;
