import { memo, ReactNode } from 'react';
import { NavigateFunction, UIMatch } from 'react-router-dom';

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
  navigate: NavigateFunction;
  routerMatches: UIMatch<unknown, unknown>[];
  children?: ReactNode;
}

const RootLayout = ({
  menuItems = [],
  navigate,
  routerMatches,
  children,
}: LayoutProps) => {
  return (
    <div className={styles.layout}>
      <RootLayoutMenu
        menuItems={menuItems}
        navigate={navigate}
        routerMatches={routerMatches}
      />
      <div className={styles.main}>
        <div className={styles.content}>{children}</div>
        <RootLayoutFooter />
      </div>
    </div>
  );
};

export default memo(RootLayout);
