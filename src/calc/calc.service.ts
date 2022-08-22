import { Injectable } from '@nestjs/common';

@Injectable()
export class CalcService {
  groupParam(...params): number[] {
    const filtered = params.filter(
      (el) => typeof el === 'number' || !isNaN(Number(el)),
    );
    return filtered.map((el) => (typeof el === 'number' ? el : Number(el)));
  }
  sum(param: number[]) {
    return param.reduce((acc, el) => acc + el, 0);
  }
  mult(param: number[]) {
    return param.reduce((acc, el) => acc * el, 1);
  }
  sub(param: number[]) {
    return param.reduce((acc, el) => acc - el, param[0] * 2);
  }
}
