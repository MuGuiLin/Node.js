import { Injectable } from '@nestjs/common';

import { iGetNewsType } from './news.types';

@Injectable()
export class NewsService {
  getNews(): iGetNewsType {
    return {
      list: [
        { title: '新闻1', content: '新闻内容1' },
        { title: '新闻2', content: '新闻内容2' },
      ],
    };
  }
}
