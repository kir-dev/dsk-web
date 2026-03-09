import { Injectable } from '@nestjs/common';
import { PrismaConfigService } from '../../config/prisma.config.service';

@Injectable()
export class RentalService {
  constructor(private readonly prisma: PrismaConfigService) {}

  async findAll(): Promise<object[]> {
    return this.prisma.rental.findMany({
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
        issuer: {
          include: {
            userRoles: {
              include: {
                role: true,
              },
            },
          },
        },
        receiver: {
          include: {
            userRoles: {
              include: {
                role: true,
              },
            },
          },
        },
        rentalEquipment: {
          include: {
            equipment: {
              include: {
                sport: true,
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
    return this.prisma.rental.findUnique({
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
        issuer: {
          include: {
            userRoles: {
              include: {
                role: true,
              },
            },
          },
        },
        receiver: {
          include: {
            userRoles: {
              include: {
                role: true,
              },
            },
          },
        },
        rentalEquipment: {
          include: {
            equipment: {
              include: {
                sport: true,
              },
            },
          },
        },
      },
    });
  }

  async create(data: any): Promise<object> {
    return this.prisma.rental.create({
      data: {
        userId: data.userId,
        startTime: data.startTime,
        endTime: data.endTime,
        status: data.status || 'SUBMITTED',
        issuerUserId: data.issuerUserId,
        receiverUserId: data.receiverUserId,
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
        issuer: {
          include: {
            userRoles: {
              include: {
                role: true,
              },
            },
          },
        },
        receiver: {
          include: {
            userRoles: {
              include: {
                role: true,
              },
            },
          },
        },
        rentalEquipment: {
          include: {
            equipment: {
              include: {
                sport: true,
              },
            },
          },
        },
      },
    });
  }

  async update(id: string, data: any): Promise<object> {
    return this.prisma.rental.update({
      where: { id },
      data: {
        startTime: data.startTime,
        endTime: data.endTime,
        status: data.status,
        issuerUserId: data.issuerUserId,
        receiverUserId: data.receiverUserId,
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
        issuer: {
          include: {
            userRoles: {
              include: {
                role: true,
              },
            },
          },
        },
        receiver: {
          include: {
            userRoles: {
              include: {
                role: true,
              },
            },
          },
        },
        rentalEquipment: {
          include: {
            equipment: {
              include: {
                sport: true,
              },
            },
          },
        },
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.rental.delete({
      where: { id },
    });
  }
}
