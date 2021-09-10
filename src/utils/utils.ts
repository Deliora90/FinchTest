import Cell from '../models/Cell';
import Random from '../models/Random';

export const getCountCellClicked = (array: Cell[]) => {
  const count = array.reduce((prev, curr) => {
    let result = prev;
    if (curr.isClicked) {
      result += 1;
    }
    return result;
  }, 0);
  return count;
};
export const onCellClick = (
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
export const getRandomNums = (count: number, min: number, max: number) => {
  const result: Random[] = [];
  while (count > result.length) {
    const num = new Random(min, max);
    if (!num.includesInArrayRandom(result)) {
      result.push(num);
    }
  }
  return result.map((val) => val.num);
};
export const getRandomNumsForField = (
  array: Cell[],
  countRandomNums: number,
  min: number,
  max: number,
) => {
  const nums = getRandomNums(countRandomNums, min, max);
  const updatedArray = array.map((cell) => {
    const element = cell;
    element.isClicked = false;
    if (nums.includes(element.num)) {
      element.isClicked = !element.isClicked;
    }
    return element;
  });
  return updatedArray;
};
export const getClickedNumbersFromCells = (cells: Cell[]) => {
  const result = cells.filter((cell) => cell.isClicked).map((cell) => cell.num);
  return result;
};
