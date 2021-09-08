import React from 'react';
import Title from '../../components/Title/Title';
import styles from './Main.module.scss';

// eslint-disable-next-line arrow-body-style
const Main: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Title>Билет 1</Title>
        </div>
      </div>
    </div>
  );
};

export default Main;
