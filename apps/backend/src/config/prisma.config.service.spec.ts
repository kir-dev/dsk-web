import { Test, TestingModule } from '@nestjs/testing';
import { PrismaConfigService } from './prisma.config.service';

describe('PrismaConfigService', () => {
  let service: PrismaConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaConfigService],
    }).compile();

    service = module.get<PrismaConfigService>(PrismaConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
