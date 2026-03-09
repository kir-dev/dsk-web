import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'PrismaGen/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaConfigService extends PrismaClient implements OnModuleInit {
  constructor() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    super({
      adapter: new PrismaPg(pool),
    });
  }
  async onModuleInit(): Promise<void> {
    await this.$connect();
  }
}
