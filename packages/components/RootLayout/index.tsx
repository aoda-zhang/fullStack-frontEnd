import { memo } from 'react';
import { Outlet } from 'react-router-dom';

import styles from './index.module.css';
import RootLayoutFooter from './RootLayoutFooter';
import RootLayoutMenu from './RootLayoutMenu';
import { MenuItemType } from './RootLayoutMenuRender';

export interface GlobalStateType {
  menuItems: any[];
  locale: string;
}

export interface LayoutProps {
  menuItems: MenuItemType[];
}

const RootLayout = ({ menuItems = [] }: LayoutProps) => {
  return (
    <div className={styles.layout}>
      <RootLayoutMenu menuItems={menuItems} />
      <div className={styles.main}>
        <div className={styles.content}>
          <Outlet />
        </div>
        <RootLayoutFooter />
      </div>
    </div>
  );
};

export default memo(RootLayout);
