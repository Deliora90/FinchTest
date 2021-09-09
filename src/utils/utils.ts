import Random from '../models/Random';

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

export const getSomething = () => 0;
