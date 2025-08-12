import hero from '@shared/assets/images/hero.png';
import Brand from '@shared/components/Brand';
import { type FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

import style from './index.module.css';

const AuthLayout: FC = () => {
  const { t } = useTranslation();
  return (
    <div className={style.authBox}>
      <Brand />
      <div className={style.contentBox}>
        <div className={style.slogan}>
          <img src={hero} alt={t('common.slogan')} className={style.loginBG} />
          <p className={style.sloganText}>{t('common.slogan')}</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
export default memo(AuthLayout);
