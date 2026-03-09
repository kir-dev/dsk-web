import { Injectable } from '@nestjs/common';
import { PrismaConfigService } from '../../config/prisma.config.service';

@Injectable()
export class RentalEquipmentService {
  constructor(private readonly prisma: PrismaConfigService) {}

  async findAll(): Promise<object[]> {
    return this.prisma.rentalEquipment.findMany({
      include: {
        rental: {
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
        },
        equipment: {
          include: {
            sport: true,
          },
        },
      },
    });
  }

  async findOne(id: string): Promise<object> {
    return this.prisma.rentalEquipment.findUnique({
      where: { id },
      include: {
        rental: {
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
        },
        equipment: {
          include: {
            sport: true,
          },
        },
      },
    });
  }

  async create(data: any): Promise<object> {
    return this.prisma.rentalEquipment.create({
      data: {
        rentalId: data.rentalId,
        equipmentId: data.equipmentId,
        quantityTaken: data.quantityTaken,
      },
      include: {
        rental: {
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
        },
        equipment: {
          include: {
            sport: true,
          },
        },
      },
    });
  }

  async update(id: string, data: any): Promise<object> {
    return this.prisma.rentalEquipment.update({
      where: { id },
      data: {
        rentalId: data.rentalId,
        equipmentId: data.equipmentId,
        quantityTaken: data.quantityTaken,
      },
      include: {
        rental: {
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
        },
        equipment: {
          include: {
            sport: true,
          },
        },
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.rentalEquipment.delete({
      where: { id },
    });
  }
}
