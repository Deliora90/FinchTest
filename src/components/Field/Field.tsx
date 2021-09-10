import React from 'react';
import classNames from 'classnames';
import Cell from '../../models/Cell';
import NumCell from '../NumCell/NumCell';
import styles from './Field.module.scss';

interface IFieldProps {
  className?: string;
  cells: Cell[];
  onCellClick: (
    num: number
  ) => void;
}

const Field: React.FC<IFieldProps> = ({ className, cells, onCellClick }) => (
  <ul className={classNames(styles.field, className)}>
    {cells.map((cell) => (
      <NumCell
        key={cell.num}
        cell={cell}
        onClick={() => onCellClick(cell.num)}
      />
    ))}
  </ul>
);

Field.defaultProps = {
  className: undefined,
};

export default Field;
