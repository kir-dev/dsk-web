import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'PrismaGen/client';

@Injectable()
export class PrismaConfigService extends PrismaClient implements OnModuleInit {
  async onModuleInit(): Promise<void> {
    await this.$connect();
  }
}
