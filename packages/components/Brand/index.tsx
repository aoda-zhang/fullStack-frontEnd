import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import logoImg from '../../assets/images/logo.png';

import styles from './index.module.css';

const Brand = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className={styles.brand}
      onClick={() => {
        navigate('/');
      }}
    >
      <img src={logoImg} alt={t('common.slogan')} className={styles.logo} />
      <span className={styles.slogan}>{t('common.slogan')}</span>
    </button>
  );
};
export default Brand;
