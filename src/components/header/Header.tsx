import { useNavigate } from 'react-router-dom';
import BackIcon from '../../assets/icons/arrow-left.svg?react';

import styles from './Header.module.css';

type HeaderProps = {
  title: string;
  showBackLink?: boolean;
};

const Header = ({ title, showBackLink = false }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        {showBackLink && (
          <button onClick={() => navigate(-1)} className={styles.backButton}>
            <BackIcon />
          </button>
        )}
        <h1 className={styles.title}>{title}</h1>
      </div>
    </header>
  );
};

export default Header;
