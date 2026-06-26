import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { CreateTripDto } from './dto/create-trip.dto';


import { InvalidTripDateException } from './exceptions/invalid-trip-date.exception';

@Injectable()
export class TripsService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async create(
    createTripDto: CreateTripDto,
    user: any,
  ) {
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
        title: createTripDto.title,
        destination: createTripDto.destination,
        startDate,
        endDate,
        userId: user.id,
      },
    });
  }

  async findAll(
    user: any,
    destination?: string,
    page: number = 1,
  ) {
    const pageSize = 5;

    const where: any = {};

    if (user.role !== 'ADMIN') {
      where.userId = user.id;
    }

    if (destination) {
      where.destination = {
        contains: destination,
      };
    }

    return this.prisma.trip.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  async findOne(
    id: number,
    user: any,
  ) {
    const trip = await this.prisma.trip.findUnique({
      where: { id },
    });

    if (!trip) {
      throw new NotFoundException(
        `Trip with ID ${id} not found`,
      );
    }

    if (
      user.role !== 'ADMIN' &&
      trip.userId !== user.id
    ) {
      throw new ForbiddenException(
        'Você não tem acesso a esta viagem',
      );
    }

    return trip;
  }

  async update(
    id: number,
    arg2?: any,
    arg3?: any,
  ) {
    let user: any;
    let updateData: Partial<CreateTripDto> | undefined;

    if (arg3 !== undefined) {
      user = arg2;
      updateData = arg3;
    } else {
      updateData = arg2;
      user = { role: 'ADMIN' };
    }

    await this.findOne(id, user);

    let startDate: any = updateData?.startDate;
    let endDate: any = updateData?.endDate;

    if (updateData?.startDate) {
      startDate = new Date(updateData.startDate);
    }

    if (updateData?.endDate) {
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

  async remove(id: number, user?: any) {
    const effectiveUser = user ?? { role: 'ADMIN' };
    await this.findOne(id, effectiveUser);

    return this.prisma.trip.delete({
      where: { id },
    });
  }
}