export default class Random {
  num: number = 0;

  constructor(min: number, max: number) {
    this.getRandomNum(min, max);
  }

  getRandomNum(min: number, max: number) {
    if (max - min > 1) {
      this.num = Math.floor(Math.random() * (max - min)) + min;
    } else {
      this.num = Math.round(2 - Math.random());
    }
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

  includesInArrayRandom(values: Random[]) {
    if (values.map((val) => val.num).includes(this.num)) {
      return true;
    }
    return false;
  }
}
