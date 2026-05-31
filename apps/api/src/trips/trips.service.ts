import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateTripDto } from './dto/create-trip.dto';

import { InvalidTripDateException } from './exceptions/invalid-trip-date.exception';

@Injectable()
export class TripsService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async create(createTripDto: CreateTripDto) {
    const startDate = new Date(createTripDto.startDate);
    const endDate = new Date(createTripDto.endDate);

    if (endDate < startDate) {
      throw new InvalidTripDateException(
        startDate,
        endDate,
      );
    }

    return this.prisma.trip.create({
      data: {
        ...createTripDto,
        startDate,
        endDate,
      },
    });
  }

  async findAll(
    destination?: string,
    page: number = 1,
  ) {
    const pageSize = 5;

    return this.prisma.trip.findMany({
      where: destination
        ? {
          destination: {
            contains: destination,
          },
        }
        : {},
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  async findOne(id: number) {
    const trip = await this.prisma.trip.findUnique({
      where: { id },
    });

    if (!trip) {
      throw new NotFoundException(
        `Trip with ID ${id} not found`,
      );
    }

    return trip;
  }

  async update(
    id: number,
    updateData: Partial<CreateTripDto>,
  ) {
    await this.findOne(id);

    let startDate = updateData.startDate;
    let endDate = updateData.endDate;

    if (updateData.startDate) {
      startDate = new Date(updateData.startDate);
    }

    if (updateData.endDate) {
      endDate = new Date(updateData.endDate);
    }

    if (startDate && endDate) {
      if (endDate < startDate) {
        throw new InvalidTripDateException(
          startDate,
          endDate,
        );
      }
    }

    return this.prisma.trip.update({
      where: { id },
      data: {
        ...updateData,
        startDate,
        endDate,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.trip.delete({
      where: { id },
    });
  }
}