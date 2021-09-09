import React from 'react';
import Cell from '../../models/Cell';
import NumCell from '../NumCell/NumCell';
import styles from './Field.module.scss';

interface IFieldProps {
  cells: Cell[];
  onCellClick: (
    num: number
  ) => void;
}

const Field: React.FC<IFieldProps> = ({ cells, onCellClick }) => (
  <ul className={styles.field}>
    {cells.map((cell) => (
      <NumCell
        key={cell.num}
        cell={cell}
        onClick={() => onCellClick(cell.num)}
      />
    ))}
  </ul>
);

export default Field;
