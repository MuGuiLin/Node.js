import { Controller, Get, Render, Version } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { NewsService } from './news.service';

@ApiTags('news 新闻相关API')
@Controller('news')
// @Controller({ path: 'news', version: '1' })
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  @Render('admin/news/index')
  getNews() {
    return this.newsService.getNews();
  }

  @Get('test')
  getVer() {
    return {
      api: 'test',
      version: 1.0,
    };
  }

  // http://localhost:3000/v2/news/test
  @Version('2')
  @Get('test')
  getVer2() {
    return {
      api: 'test v2.0，我是news控制器下test接口的第二版 -> http://localhost:3000/v2/news/test',
      version: 2.0,
    };
  }
}
