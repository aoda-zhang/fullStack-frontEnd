import { AlignJustify } from 'lucide-react';
import { useState } from 'react';
import { useMatches, useNavigate } from 'react-router-dom';

import useIsMobile from '../../hooks/useIsMobile';
import Brand from '../Brand';

import styles from './index.module.css';
import RootLayoutMenuRender, { MenuItemType } from './RootLayoutMenuRender';
import RootLayoutSidebar from './RootLayoutSidebar';

interface RouterInfoType {
  data: Record<string, any> | undefined;
  handle: {
    isMenuAvailable: boolean;
    requireUserLogin: boolean;
  };
  id: string;
  params: Record<string, any> | undefined;
  pathname: string;
}

export interface RootLayoutHeaderProps {
  menuItems: MenuItemType[];
}

const RootLayoutMenu = ({ menuItems }: RootLayoutHeaderProps) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const matches = useMatches();
  const currentRouter = matches?.[(matches?.length ?? 0) - 1] as RouterInfoType;
  const isMenuAvailable = !currentRouter?.handle?.isMenuAvailable;

  const onOpenSidebar = () => setSidebarOpen(true);
  const onCloseSidebar = () => setSidebarOpen(false);

  if (!isMenuAvailable) return null;

  return (
    <header className={styles.header}>
      <button
        type="button"
        className={styles.brandButton}
        onClick={() => {
          navigate('/');
        }}
      >
        <Brand />
      </button>
      {!isMobile && (
        <RootLayoutMenuRender
          menuItems={menuItems}
          activePath={currentRouter?.pathname || ''}
        />
      )}

      {/* Open Side bar Icon */}
      {isMobile && <AlignJustify size={36} onClick={onOpenSidebar} />}
      {/* Side bar */}
      <RootLayoutSidebar
        menuItems={menuItems}
        isSidebarOpen={isSidebarOpen}
        onCloseSidebar={onCloseSidebar}
      />
    </header>
  );
};

export default RootLayoutMenu;
