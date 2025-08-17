import authBanner from '@shared/assets/images/authBanner.png';
import Brand from '@shared/components/Brand';
import { type FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from 'react-router-dom';

import style from './index.module.css';

const AuthLayout: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className={style.authBox}>
      <Brand navigate={navigate} />
      <div className={style.contentBox}>
        <div className={style.slogan}>
          <img
            src={authBanner}
            alt={t('common.slogan')}
            className={style.loginBG}
          />
          <p className={style.sloganText}>{t('common.slogan')}</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
export default memo(AuthLayout);
