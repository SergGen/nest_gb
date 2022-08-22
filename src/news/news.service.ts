import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Injectable()
export class NewsService {
  private news = {};
  getNews(id: string): CreateNewsDto | null {
    if (Object.hasOwn(this.news, id)) {
      return this.news[id];
    }
    return null;
  }
  getAll(): Record<string, CreateNewsDto> {
    return this.news;
  }
  setNews(id: number, news: CreateNewsDto): void {
    this.news[String(id)] = news;
  }
  updateNews(id: string, news: UpdateNewsDto): void {
    this.news[id] = { ...this.news[id], ...news };
  }
}
