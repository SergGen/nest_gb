import {
  Body,
  Controller,
  Header,
  HttpStatus,
  Param,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CalcService } from './calc.service';

@Controller('calc')
export class CalcController {
  constructor(private readonly calcService: CalcService) {}
  @Put(':id')
  @Header('Content-Type', 'application/json')
  getCalcParams(
    @Req() request: Request,
    @Res() res: Response,
    @Param('id') id: number,
    @Query() query: Record<string, number>,
    @Body() body: number[],
  ): void {
    const correctParams = ['sum', 'mult', 'sub'];
    const operationType = <string>request.headers['type-operation'];
    if (!correctParams.includes(operationType)) {
      res.statusMessage = 'wrong params';
      res.status(HttpStatus.BAD_REQUEST).json({ error: 'wrong params' });
    } else {
      const checkedId = id || null;
      const checkedQuery =
        Object.values(query).length > 0 ? Object.values(query) : ['x'];
      const checkedBody = Array.isArray(body) ? body : ['x'];
      const inputParam = this.calcService.groupParam(
        checkedId,
        ...checkedQuery,
        ...checkedBody,
      );
      const result = this.calcService[operationType](inputParam);
      res.statusMessage = 'ok';
      res.status(HttpStatus.OK).json(result);
    }
  }
}
