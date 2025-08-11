import { AlignJustify } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useIsMobile from '../../hooks/useIsMobile';
import Brand from '../Brand';

import styles from './index.module.css';
import RootLayoutMenuRender, { MenuItemType } from './RootLayoutMenuRender';
import RootLayoutSidebar from './RootLayoutSidebar';

export interface RootLayoutHeaderProps {
  isMenuAvailable: boolean;
  menuItems: MenuItemType[];
}

const RootLayoutMenu = ({
  isMenuAvailable,
  menuItems,
}: RootLayoutHeaderProps) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

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
      {!isMobile && <RootLayoutMenuRender menuItems={menuItems} />}

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
