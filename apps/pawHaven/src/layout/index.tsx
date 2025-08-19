import { memo } from 'react';
import {
  NavigateFunction,
  Outlet,
  UIMatch,
  useMatches,
  useNavigate,
} from 'react-router-dom';

import styles from './index.module.css';
import RootLayoutFooter from './RootLayoutFooter';
import RootLayoutMenu from './RootLayoutMenu';
import { MenuItemType } from './RootLayoutMenuRender';

import { useGlobalState } from '@/store/globalReducer';

export interface GlobalStateType {
  menuItems: any[];
  locale: string;
}

export interface LayoutProps {
  menuItems: MenuItemType[];
  navigate: NavigateFunction;
  routerMatches: UIMatch<unknown, unknown>[];
}

const RootLayout = () => {
  const { menuItems } = useGlobalState();
  const navigate = useNavigate();
  const routerMatches = useMatches();
  return (
    <div className={styles.layout}>
      <RootLayoutMenu
        menuItems={menuItems}
        navigate={navigate}
        routerMatches={routerMatches}
      />
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
