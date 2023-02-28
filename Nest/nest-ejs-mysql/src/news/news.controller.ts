import { Controller, Get, Render } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { NewsService } from './news.service';

@ApiTags('news 新闻相关API')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  @Render('admin/news/index')
  getNews() {
    return this.newsService.getNews();
  }
}
