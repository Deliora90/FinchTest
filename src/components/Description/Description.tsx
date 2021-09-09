import React from 'react';
import classnames from 'classnames';
import styles from './Description.module.scss';

interface IDescriptionProps {
  className?: string;
  label?: string;
}

const Description: React.FC<IDescriptionProps> = ({ label, className, children }) => (
  <div className={classnames(styles.container, className)}>
    {label && <h2 className={styles.label}>{label}</h2>}
    <p className={styles.text}>{children}</p>
  </div>
);

Description.defaultProps = {
  className: undefined,
  label: undefined,
};

export default Description;
