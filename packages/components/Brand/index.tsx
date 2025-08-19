import { useTranslation } from 'react-i18next';
import { NavigateFunction } from 'react-router-dom';

import logoImg from '../../assets/images/logo.png';

import styles from './index.module.css';

const Brand = ({ navigate }: { navigate: NavigateFunction }) => {
  const { t } = useTranslation();

  return (
    <div
      className={styles.brand}
      onClick={() => {
        navigate('/');
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate('/');
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={t('common.name')}
    >
      <img src={logoImg} alt={t('common.slogan')} className={styles.logo} />
      <span className={styles.name}>{t('common.name')}</span>
    </div>
  );
};
export default Brand;
