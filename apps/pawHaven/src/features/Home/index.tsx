import { memo, useEffect } from 'react';

import { useDefaultMenu } from './apis/queries';
import Hero from './Hero';
import styles from './index.module.css';
import RecentRescue from './RecentRescue';
import RecentStory from './RecentStory';

import { useReduxDispatch } from '@/hooks/reduxHooks';
import { setMenuItems } from '@/store/globalReducer';

const Home = () => {
  const dispatch = useReduxDispatch();
  const { data: menuItems } = useDefaultMenu();

  useEffect(() => {
    dispatch(setMenuItems(menuItems ?? []));
  }, [menuItems, dispatch]);

  return (
    <div className={styles.home}>
      <Hero />
      <RecentRescue />
      <RecentStory />
    </div>
  );
};

export default memo(Home);
