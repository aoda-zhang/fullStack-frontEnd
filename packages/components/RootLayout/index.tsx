import { memo } from 'react';
import { Outlet, useMatches } from 'react-router-dom';

import styles from './index.module.css';
import RootLayoutFooter from './RootLayoutFooter';
import RootLayoutMenu from './RootLayoutMenu';
import { MenuItemType } from './RootLayoutMenuRender';

export const RootLayoutHandles = {
  isMenuAvailable: 'isMenuAvailable',
  requireUserLogin: 'requireUserLogin',
};

export interface GlobalStateType {
  menuItems: any[];
  locale: string;
}

export interface LayoutProps {
  menuItems: MenuItemType[];
}

const RootLayout = ({ menuItems = [] }: LayoutProps) => {
  const matches = useMatches();
  const currentRouter = matches?.[(matches?.length ?? 0) - 1] as {
    handle?: Record<string, any>;
  };
  const isMenuAvailable =
    !currentRouter?.handle?.[RootLayoutHandles.isMenuAvailable];

  return (
    <div className={styles.layout}>
      <RootLayoutMenu isMenuAvailable={isMenuAvailable} menuItems={menuItems} />
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
