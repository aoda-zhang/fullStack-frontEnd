import { Button } from '@mui/material';
import hero from '@shared/assets/images/hero.png';
import Brand from '@shared/components/Brand';
import FormInput from '@shared/components/Form/FormInput';
import storageKeys from '@shared/constants/storageKeys';
import storage from '@shared/utils/storage';
import { type FC, memo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import * as AuthAPI from '../apis';

import style from './index.module.css';

import { setUserInfo } from '@/store/globalReducer';

const Login: FC = () => {
  const formProps = useForm({});
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { mutate, isLoading } = useMutation(AuthAPI.login, {
    onSuccess: (loginInfo) => {
      if (loginInfo?.accessToken && loginInfo?.refreshToken) {
        storage.set(storageKeys.accessToken, loginInfo?.accessToken);
        storage.set(storageKeys.refreshToken, loginInfo?.refreshToken);
        setUserInfo(loginInfo?.baseUserInfo);
        navigate('/trip/step1');
      }
    },
  });
  return (
    <div className={style.loginBox}>
      <Brand />
      <div className={style.contentBox}>
        <div className={style.slogan}>
          <img src={hero} alt={t('common.slogan')} className={style.loginBG} />
        </div>

        <div className={style.loginForm}>
          <div className={style.welcomeText}>{t('login.primary_login')}</div>
          <FormProvider {...formProps}>
            <form>
              <FormInput
                variant="outlined"
                size="small"
                className={style.baseForm}
                label={t('login.userName')}
                name="userName"
              />
              <FormInput
                type="password"
                variant="outlined"
                className={style.baseForm}
                size="small"
                label={t('login.password')}
                name="password"
              />
              <Button
                disabled={isLoading}
                type="submit"
                className={style.baseForm}
                variant="contained"
                onClick={formProps.handleSubmit((data) => {
                  mutate({
                    userName: data.userName,
                    password: data.password,
                  });
                })}
              >
                {t('login.primary_login')}
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};
export default memo(Login);
