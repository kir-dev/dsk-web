import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaConfigService } from '../../config/prisma.config.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaConfigService],
})
export class UserModule {}
