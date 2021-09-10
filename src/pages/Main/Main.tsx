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
import { API_URL } from '../../utils/consts';
import Alert from '../../components/Alert/Alert';
import {
  onCellClick,
  getRandomNumsForField,
  getClickedNumbersFromCells,
  getRandomNums,
} from '../../utils/utils';
import Ticket from '../../models/Ticket';

const Main: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [resultGame, setResultGame] = useState<string | null>(null);
  const [firstField, setFirstField] = useState<Cell[]>([]);
  const [secondField, setSecondField] = useState<Cell[]>([]);

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

  const sendRequest = (data: Ticket) => {
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
  const onClickMagicWand = () => {
    const numsFirstField = getRandomNumsForField(firstField, 8, 1, 19);
    const numsSecondField = getRandomNumsForField(secondField, 1, 1, 2);
    setFirstField(numsFirstField);
    setSecondField(numsSecondField);
  };
  const checkCells = async () => {
    const firstCells = getClickedNumbersFromCells(firstField);
    const secondCells = getClickedNumbersFromCells(secondField);
    const randomNumsFirstField = getRandomNums(8, 1, 19);
    const randomNumSecondField = getRandomNums(1, 1, 2);
    const ticket = new Ticket(firstCells, secondCells);
    ticket.isTicketWin(randomNumsFirstField, randomNumSecondField);
    if (ticket.isTicketWon) {
      setResultGame('Ого, вы выиграли! Поздравляем!');
    } else {
      setResultGame('Может в следующий раз!');
    }
    sendRequest(ticket);
  };
  const onCloseError = () => {
    setError(null);
  };

  return (
    <div className={styles.wrapper}>
      <Alert isActive={error !== null} onClose={onCloseError}>{error}</Alert>
      <div className={styles.container}>
        <div className={styles.header}>
          <Title className={styles.title}>Билет 1</Title>
          {!resultGame && <MagicWand className={styles.icon} onClick={onClickMagicWand} />}
        </div>
        {resultGame
          ? <Description className={styles.description}>{resultGame}</Description>
          : (
            <>
              <div className={styles.body}>
                <div>
                  <Description label="Поле 1" className={styles.description}>Отметьте 8 чисел.</Description>
                  <Field
                    cells={firstField}
                    className={styles.field}
                    onCellClick={(cell) => onCellClick(firstField, cell, setFirstField, 8)}
                  />
                </div>
                <div>
                  <Description label="Поле 2" className={styles.description}>Отметьте 1 число.</Description>
                  <Field
                    cells={secondField}
                    className={styles.field}
                    onCellClick={(cell) => onCellClick(secondField, cell, setSecondField, 1)}
                  />
                </div>
              </div>
              <div className={styles.footer}>
                <Button className={styles.button} onClick={checkCells}>Показать результат</Button>
              </div>
            </>
          )}
      </div>
    </div>
  );
};

export default Main;
