import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { PrismaConfigService } from '../../config/prisma.config.service';

@Module({
  controllers: [NewsController],
  providers: [NewsService, PrismaConfigService],
})
export class NewsModule {}
