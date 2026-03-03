import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaConfigService } from './config/config/prisma.config.service';

@Module({
  imports: [PrismaModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [AppService, PrismaConfigService],
})
export class AppModule {}
