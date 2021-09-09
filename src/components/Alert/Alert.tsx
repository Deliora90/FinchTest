/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import styles from './Alert.module.scss';

interface IAlertProps {
  isActive: boolean;
  onClose: () => void;
}

const Alert: React.FC<IAlertProps> = ({ isActive, onClose, children }) => {
  if (isActive) {
    return (
      <div className={styles.alert}>
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          onKeyDown={(e) => {
            if (e.code === 'Enter') {
              onClose();
            }
          }}
        />
        {children}
      </div>
    );
  }
  return <></>;
};

export default Alert;
