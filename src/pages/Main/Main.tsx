import React, { useEffect, useState } from 'react';
import axios from 'axios';
import retry from 'retry';
import Title from '../../components/Title/Title';
import styles from './Main.module.scss';
import Description from '../../components/Description/Description';
import Button from '../../components/Button/Button';
import { ReactComponent as MagicWand } from '../../assets/svg/magic-wand.svg';
import Cell from '../../models/Cell';
import Field from '../../components/Field/Field';
import TicketRequest from '../../models/TicketRequest';
import { API_URL } from '../../utils/consts';
import Alert from '../../components/Alert/Alert';
import { getRandomNums } from '../../utils/utils';

const Main: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [firstField, setFirstField] = useState<Cell[]>([]);
  const [secondField, setSecondField] = useState<Cell[]>([]);

  const getCountCellClicked = (array: Cell[]) => {
    const count = array.reduce((prev, curr) => {
      let result = prev;
      if (curr.isClicked) {
        result += 1;
      }
      return result;
    }, 0);
    return count;
  };

  const sendRequest = (data: TicketRequest) => {
    const operation = retry.operation({
      retries: 2,
      minTimeout: 2000,
      maxTimeout: 2000,
    });
    operation.attempt(async () => {
      try {
        await axios.post(API_URL, data);
        // Update data
      } catch (err: any) {
        if (operation.retry(err)) {
          return;
        }
        setError('Ошибка получения данных');
      }
    });
  };

  useEffect(() => {
    setFirstField(() => {
      const result: Cell[] = [];
      for (let i = 1; i <= 19; i += 1) {
        result.push(new Cell(i));
      }
      return result;
    });
    setSecondField(() => {
      const result: Cell[] = [];
      for (let i = 1; i <= 2; i += 1) {
        result.push(new Cell(i));
      }
      return result;
    });
  }, []);

  const onCellClick = (
    array: Cell[],
    num: number,
    funcUpdate: (array: Cell[]) => void,
    countSelected: number,
  ) => {
    const count = getCountCellClicked(array);
    const updatedArray = array.map((cell) => {
      const element = cell;
      if (element.num === num && (countSelected > count || element.isClicked)) {
        element.isClicked = !element.isClicked;
      }
      return element;
    });
    funcUpdate(updatedArray);
  };
  const onClickMagicWand = () => {
    const numsFirstField = getRandomNums(8, 1, 19);
    const numsSecondField = getRandomNums(1, 1, 2);
    const updatedArrayFirstField = firstField.map((cell) => {
      const element = cell;
      element.isClicked = false;
      if (numsFirstField.includes(element.num)) {
        element.isClicked = !element.isClicked;
      }
      return element;
    });
    const updatedArraySecondField = secondField.map((cell) => {
      const element = cell;
      element.isClicked = false;
      if (numsSecondField.includes(element.num)) {
        element.isClicked = !element.isClicked;
      }
      return element;
    });
    setFirstField(updatedArrayFirstField);
    setSecondField(updatedArraySecondField);
  };
  const checkCells = async () => {
    const firstCells = firstField.filter((cell) => cell.isClicked).map((cell) => cell.num);
    const secondCells = secondField.filter((cell) => cell.isClicked).map((cell) => cell.num);
    const data = {
      selectedNumber: {
        firstField: firstCells,
        secondField: secondCells,
      },
      isTicketWon: false,
    };
    sendRequest(data);
  };

  return (
    <div className={styles.wrapper}>
      <Alert isActive={error !== null} onClose={() => { setError(null); }}>{error}</Alert>
      <div className={styles.container}>
        <div className={styles.header}>
          <Title>Билет 1</Title>
          <MagicWand className={styles.icon} onClick={onClickMagicWand} />
        </div>
        <div className={styles.body}>
          <div className={styles.field_container}>
            <Description label="Поле 1">Отметьте 8 чисел.</Description>
            <Field
              cells={firstField}
              onCellClick={(cell) => onCellClick(firstField, cell, setFirstField, 8)}
            />
          </div>
          <div className={styles.field_container}>
            <Description label="Поле 2">Отметьте 1 число.</Description>
            <Field
              cells={secondField}
              onCellClick={(cell) => onCellClick(secondField, cell, setSecondField, 1)}
            />
          </div>
          <Button onClick={checkCells}>Показать результат</Button>
        </div>
      </div>
    </div>
  );
};

export default Main;
