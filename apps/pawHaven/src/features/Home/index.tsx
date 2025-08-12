import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useDefaultMenu } from './apis/queries';
import styles from './index.module.css';

import { useReduxDispatch } from '@/hooks/reduxHooks';
import { setMenuItems } from '@/store/globalReducer';

const Home = () => {
  const { t } = useTranslation();
  const dispatch = useReduxDispatch();
  const { data: menuItems } = useDefaultMenu();

  useEffect(() => {
    dispatch(setMenuItems(menuItems ?? []));
  }, [menuItems, dispatch]);

  return (
    <div className={styles.home}>
      <div className={styles.slog}>
        <div className="z-10">
          <p className={styles.title}>{t('common.slogan')}</p>
          <p className={styles.subTitle}>{t('common.subSlogan')}</p>
        </div>
        <p className="z-10">
          <button
            className="radiusButton text-lg lg:text-2xl text-white bg-primary mr-8 mb-3 lg:mb-0"
            type="button"
          >
            参与救助
          </button>
          <button
            type="button"
            className="radiusButton text-lg lg:text-2xl text-white bg-secondary"
          >
            参与救助
          </button>
        </p>
      </div>
    </div>
  );
};

export default memo(Home);
