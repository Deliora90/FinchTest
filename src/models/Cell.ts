export default class Cell {
  num: number;

  isClicked: boolean;

  constructor(num: number) {
    this.num = num;
    this.isClicked = false;
  }
}
