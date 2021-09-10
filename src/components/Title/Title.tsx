import React from 'react';
import classNames from 'classnames';
import styles from './Title.module.scss';

interface ITitleProps {
  className?: string;
}

const Title: React.FC<ITitleProps> = ({ className, children }) => (
  <h1 className={classNames(styles.title, className)}>
    {children}
  </h1>
);

Title.defaultProps = {
  className: undefined,
};

export default Title;
