import { Injectable } from '@nestjs/common';
import { PrismaConfigService } from '../../config/prisma.config.service';

@Injectable()
export class NewsService {
  constructor(private readonly prisma: PrismaConfigService) {}

  async findAll(): Promise<object[]> {
    return this.prisma.news.findMany({
      include: {
        author: {
          include: {
            userRoles: {
              include: {
                role: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string): Promise<object> {
    return this.prisma.news.findUnique({
      where: { id },
      include: {
        author: {
          include: {
            userRoles: {
              include: {
                role: true,
              },
            },
          },
        },
      },
    });
  }

  async create(data: any): Promise<object> {
    return this.prisma.news.create({
      data: {
        content: data.content,
        authorId: data.authorId,
      },
      include: {
        author: {
          include: {
            userRoles: {
              include: {
                role: true,
              },
            },
          },
        },
      },
    });
  }

  async update(id: string, data: any): Promise<object> {
    return this.prisma.news.update({
      where: { id },
      data: {
        content: data.content,
      },
      include: {
        author: {
          include: {
            userRoles: {
              include: {
                role: true,
              },
            },
          },
        },
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.news.delete({
      where: { id },
    });
  }
}
