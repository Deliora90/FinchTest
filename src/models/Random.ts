export default class Random {
  num: number = 0;

  constructor(min: number, max: number) {
    this.getRandomNum(min, max);
  }

  getRandomNum(min: number, max: number) {
    this.num = Math.floor(Math.random() * (max - min)) + min;
  }

  isEquals(value: number) {
    if (this.num === value) {
      return true;
    }
    return false;
  }

  includesInArray(values: number[]) {
    if (values.includes(this.num)) {
      return true;
    }
    return false;
  }
}
