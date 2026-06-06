import { Test, TestingModule } from '@nestjs/testing';
import { TripsService } from './trips.service';
import { PrismaService } from '../prisma/prisma.service';
import { InvalidTripDateException } from './exceptions/invalid-trip-date.exception';
import { NotFoundException } from '@nestjs/common';

describe('TripsService', () => {
  let service: TripsService;
  let prisma: PrismaService;

  const mockTrip = {
    id: 1,
    title: 'Viagem de Férias',
    destination: 'Paris',
    startDate: new Date('2026-07-01'),
    endDate: new Date('2026-07-15'),
    userId: 1,
  };

  const mockPrismaService = {
    trip: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TripsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<TripsService>(TripsService);
    prisma = module.get<PrismaService>(PrismaService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create a trip when dates are valid', async () => {
      const createTripDto = {
        title: 'Viagem de Férias',
        destination: 'Paris',
        startDate: new Date('2026-07-01'),
        endDate: new Date('2026-07-15'),
        userId: 1,
      };

      mockPrismaService.trip.create.mockResolvedValue(mockTrip);

      const result = await service.create(createTripDto);

      expect(prisma.trip.create).toHaveBeenCalledWith({
        data: {
          ...createTripDto,
          startDate: new Date(createTripDto.startDate),
          endDate: new Date(createTripDto.endDate),
        },
      });
      expect(result).toEqual(mockTrip);
    });

    it('should throw InvalidTripDateException when endDate is before startDate', async () => {
      const createTripDto = {
        title: 'Viagem de Férias',
        destination: 'Paris',
        startDate: new Date('2026-07-15'),
        endDate: new Date('2026-07-01'),
        userId: 1,
      };

      await expect(service.create(createTripDto)).rejects.toThrow(
        InvalidTripDateException,
      );
      expect(prisma.trip.create).not.toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should retrieve list of trips without destination filter', async () => {
      const tripsList = [mockTrip];
      mockPrismaService.trip.findMany.mockResolvedValue(tripsList);

      const result = await service.findAll();

      expect(prisma.trip.findMany).toHaveBeenCalledWith({
        where: {},
        skip: 0,
        take: 5,
      });
      expect(result).toEqual(tripsList);
    });

    it('should retrieve list of trips with pagination and destination filter', async () => {
      const tripsList = [mockTrip];
      mockPrismaService.trip.findMany.mockResolvedValue(tripsList);

      const result = await service.findAll('Paris', 2);

      expect(prisma.trip.findMany).toHaveBeenCalledWith({
        where: {
          destination: {
            contains: 'Paris',
          },
        },
        skip: 5,
        take: 5,
      });
      expect(result).toEqual(tripsList);
    });
  });

  describe('findOne', () => {
    it('should return a trip when found', async () => {
      mockPrismaService.trip.findUnique.mockResolvedValue(mockTrip);

      const result = await service.findOne(1);

      expect(prisma.trip.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockTrip);
    });

    it('should throw NotFoundException when trip is not found', async () => {
      mockPrismaService.trip.findUnique.mockResolvedValue(null);

      await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
      expect(prisma.trip.findUnique).toHaveBeenCalledWith({
        where: { id: 99 },
      });
    });
  });

  describe('update', () => {
    it('should successfully update a trip when dates are valid', async () => {
      const updateData = {
        title: 'Viagem Atualizada',
        startDate: new Date('2026-07-02'),
        endDate: new Date('2026-07-14'),
      };

      const updatedTrip = { ...mockTrip, ...updateData };

      mockPrismaService.trip.findUnique.mockResolvedValue(mockTrip);
      mockPrismaService.trip.update.mockResolvedValue(updatedTrip);

      const result = await service.update(1, updateData);

      expect(prisma.trip.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          ...updateData,
          startDate: new Date(updateData.startDate),
          endDate: new Date(updateData.endDate),
        },
      });
      expect(result).toEqual(updatedTrip);
    });

    it('should throw InvalidTripDateException on update when updated endDate is before updated startDate', async () => {
      const updateData = {
        startDate: new Date('2026-07-15'),
        endDate: new Date('2026-07-01'),
      };

      mockPrismaService.trip.findUnique.mockResolvedValue(mockTrip);

      await expect(service.update(1, updateData)).rejects.toThrow(
        InvalidTripDateException,
      );
      expect(prisma.trip.update).not.toHaveBeenCalled();
    });

    it('should throw NotFoundException on update when trip is not found', async () => {
      mockPrismaService.trip.findUnique.mockResolvedValue(null);

      await expect(service.update(99, { title: 'New Title' })).rejects.toThrow(
        NotFoundException,
      );
      expect(prisma.trip.update).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should successfully delete a trip', async () => {
      mockPrismaService.trip.findUnique.mockResolvedValue(mockTrip);
      mockPrismaService.trip.delete.mockResolvedValue(mockTrip);

      const result = await service.remove(1);

      expect(prisma.trip.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockTrip);
    });

    it('should throw NotFoundException on remove when trip is not found', async () => {
      mockPrismaService.trip.findUnique.mockResolvedValue(null);

      await expect(service.remove(99)).rejects.toThrow(NotFoundException);
      expect(prisma.trip.delete).not.toHaveBeenCalled();
    });
  });
});
