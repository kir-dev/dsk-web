import { Injectable } from '@nestjs/common';
import { PrismaConfigService } from '../../config/prisma.config.service';

@Injectable()
export class ReservationService {
  constructor(private readonly prisma: PrismaConfigService) {}

  async findAll(): Promise<object[]> {
    return this.prisma.reservation.findMany({
      include: {
        user: {
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
        startTime: 'asc',
      },
    });
  }

  async findOne(id: string): Promise<object> {
    return this.prisma.reservation.findUnique({
      where: { id },
      include: {
        user: {
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
    return this.prisma.reservation.create({
      data: {
        userId: data.userId,
        startTime: data.startTime,
        endTime: data.endTime,
        status: data.status || 'SUBMITTED',
      },
      include: {
        user: {
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
    return this.prisma.reservation.update({
      where: { id },
      data: {
        startTime: data.startTime,
        endTime: data.endTime,
        status: data.status,
      },
      include: {
        user: {
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
    await this.prisma.reservation.delete({
      where: { id },
    });
  }
}
