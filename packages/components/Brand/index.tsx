import { useTranslation } from 'react-i18next';
import { NavigateFunction } from 'react-router-dom';

import logoImg from '../../assets/images/logo.png';

import styles from './index.module.css';

const Brand = ({ navigate }: { navigate: NavigateFunction }) => {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      className={styles.brand}
      onClick={() => {
        navigate('/');
      }}
    >
      <img src={logoImg} alt={t('common.slogan')} className={styles.logo} />
      <span className={styles.name}>{t('common.name')}</span>
    </button>
  );
};
export default Brand;
