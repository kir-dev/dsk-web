import { Injectable } from '@nestjs/common';
import { PrismaConfigService } from '../../config/prisma.config.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaConfigService) {}

  async findAll(): Promise<object[]> {
    return this.prisma.user.findMany({
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });
  }

  async getMe(): Promise<object> {
    // This would typically use the current user from context/JWT
    // Placeholder implementation
    return {};
  }

  async findOne(id: string): Promise<object> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });
  }

  async update(id: string, data: any): Promise<object> {
    return this.prisma.user.update({
      where: { id },
      data,
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });
  }
}
