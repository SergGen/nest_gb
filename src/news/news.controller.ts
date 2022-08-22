import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { Response } from 'express';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}
  @Get('all')
  getNewsAll(@Res() res: Response): void {
    try {
      const caughtNews = this.newsService.getAll();
      res.statusMessage = 'ok';
      res.status(HttpStatus.OK).json(caughtNews);
    } catch (err) {
      res.statusMessage = 'get all news error';
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
      throw new Error(err);
    }
  }
  @Get(':id')
  getNews(@Res() res: Response, @Param('id') id: string): void {
    const caughtNews: CreateNewsDto | null = this.newsService.getNews(id);
    if (caughtNews !== null) {
      res.statusMessage = 'ok';
      res.status(HttpStatus.OK).json(caughtNews);
    } else {
      res.statusMessage = 'not found news';
      res.status(HttpStatus.NOT_FOUND).end();
    }
  }
  @Post()
  setNews(@Res() res: Response, @Body() createNewsDto: CreateNewsDto): void {
    try {
      this.newsService.setNews(createNewsDto.createdAt, createNewsDto);
      res.statusMessage = 'ok';
      res.status(HttpStatus.CREATED).end();
    } catch (err) {
      res.statusMessage = 'add news error';
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
      throw new Error(err);
    }
  }
  @Patch(':id')
  updateNews(
    @Param('id') id: string,
    @Res() res: Response,
    @Body() updateNewsDto: UpdateNewsDto,
  ): void {
    try {
      this.newsService.updateNews(id, updateNewsDto);
      res.statusMessage = 'ok';
      res.status(HttpStatus.ACCEPTED).end();
    } catch (err) {
      res.statusMessage = 'update news error';
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
      throw new Error(err);
    }
  }
}
