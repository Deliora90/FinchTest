import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

interface IButtonProps {
  className?: string;
  onClick: () => void;
}

const Button: React.FC<IButtonProps> = ({ className, onClick, children }) => (
  <button
    type="button"
    className={classNames(styles.button, className)}
    onClick={onClick}
  >
    {children}
  </button>
);

Button.defaultProps = {
  className: undefined,
};

export default Button;
