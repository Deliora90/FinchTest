import React from 'react';
import classnames from 'classnames';
import styles from './NumCell.module.scss';
import Cell from '../../models/Cell';

interface INumCellProps {
  cell: Cell;
  onClick?: () => void;
}

const NumCell: React.FC<INumCellProps> = ({ cell, onClick }) => (
  <button
    type="button"
    className={classnames(styles.cell, cell.isClicked ? styles.clicked : undefined)}
    onClick={onClick}
    onKeyDown={(e) => {
      if (e.code === 'Enter' && onClick) {
        onClick();
      }
    }}
  >
    <p className={styles.text}>{cell.num}</p>
  </button>
);

NumCell.defaultProps = {
  onClick: undefined,
};

export default NumCell;
