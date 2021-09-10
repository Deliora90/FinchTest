export default class Ticket {
  firstField: number[];

  secondField: number[];

  isTicketWon: boolean;

  constructor(firstField: number[], secondField: number[]) {
    this.firstField = firstField;
    this.secondField = secondField;
    this.isTicketWon = false;
  }

  getNumberOfRepetitions = (nums: number[], randomNums: number[]) => {
    const result = randomNums.reduce((prev, curr) => {
      let count = prev;
      if (nums.includes(curr)) {
        count += 1;
      }
      return count;
    }, 0);
    return result;
  };

  isTicketWin(randomNumsFirstField: number[], randomNumSecondField: number[]) {
    const repetitionsFirst = this.getNumberOfRepetitions(this.firstField, randomNumsFirstField);
    const repetitionsSecond = this.getNumberOfRepetitions(this.secondField, randomNumSecondField);

    if ((repetitionsFirst > 4)
      || (repetitionsFirst > 3 && repetitionsSecond > 0)) {
      this.isTicketWon = true;
    }
    return this.isTicketWon;
  }
}
