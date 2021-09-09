import React from 'react';
import styles from './Button.module.scss';

interface IButtonProps {
  onClick: () => void;
}

const Button: React.FC<IButtonProps> = ({ onClick, children }) => (
  <button
    type="button"
    className={styles.button}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
