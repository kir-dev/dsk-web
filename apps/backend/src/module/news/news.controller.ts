import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async findAll(): Promise<object[]> {
    return this.newsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<object> {
    return this.newsService.findOne(id);
  }

  @Post()
  async create(@Body() data: any): Promise<object> {
    return this.newsService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any): Promise<object> {
    return this.newsService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.newsService.delete(id);
  }
}
