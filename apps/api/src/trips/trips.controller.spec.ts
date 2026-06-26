import { Test, TestingModule } from '@nestjs/testing';
import { TripsController } from './trips.controller';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { QueryTripDto } from './dto/query-trip.dto';

describe('TripsController', () => {
  let controller: TripsController;
  let service: TripsService;

  const mockUser = {
    id: 1,
    email: 'teste@email.com',
    role: 'USER',
  };

  const mockTrip = {
    id: 1,
    title: 'Viagem de Férias',
    destination: 'Paris',
    startDate: new Date('2026-07-01'),
    endDate: new Date('2026-07-15'),
    userId: 1,
  };

  const mockTripsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripsController],
      providers: [
        {
          provide: TripsService,
          useValue: mockTripsService,
        },
      ],
    }).compile();

    controller = module.get<TripsController>(TripsController);
    service = module.get<TripsService>(TripsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create with correct dto and return the created trip', async () => {
      const dto: CreateTripDto = {
        title: 'Viagem de Férias',
        destination: 'Paris',
        startDate: new Date('2026-07-01'),
        endDate: new Date('2026-07-15'),
      };

      mockTripsService.create.mockResolvedValue(mockTrip);

      const result = await controller.create(dto, mockUser);

      expect(service.create).toHaveBeenCalledWith(dto, mockUser);
      expect(result).toEqual(mockTrip);
    });
  });

  describe('findAll', () => {
    it('should call service.findAll with query parameters and return trips list', async () => {
      const query: QueryTripDto = {
        destination: 'Paris',
        page: 2,
      };
      const tripsList = [mockTrip];

      mockTripsService.findAll.mockResolvedValue(tripsList);

      const result = await controller.findAll(query, mockUser);

      expect(service.findAll).toHaveBeenCalledWith(mockUser, 'Paris', 2);
      expect(result).toEqual(tripsList);
    });

    it('should call service.findAll with default parameters when query is empty', async () => {
      const query: QueryTripDto = {};
      const tripsList = [mockTrip];

      mockTripsService.findAll.mockResolvedValue(tripsList);

      const result = await controller.findAll(query, mockUser);

      expect(service.findAll).toHaveBeenCalledWith(mockUser, undefined, undefined);
      expect(result).toEqual(tripsList);
    });
  });

  describe('findOne', () => {
    it('should call service.findOne with id and return the trip', async () => {
      mockTripsService.findOne.mockResolvedValue(mockTrip);

      const result = await controller.findOne(1, mockUser);

      expect(service.findOne).toHaveBeenCalledWith(1, mockUser);
      expect(result).toEqual(mockTrip);
    });
  });

  describe('update', () => {
    it('should call service.update with correct parameters and return the updated trip', async () => {
      const updateData: Partial<CreateTripDto> = {
        title: 'Novo Título',
      };
      const updatedTrip = { ...mockTrip, ...updateData };

      mockTripsService.update.mockResolvedValue(updatedTrip);

      const result = await controller.update(1, updateData);

      expect(service.update).toHaveBeenCalledWith(1, updateData);
      expect(result).toEqual(updatedTrip);
    });
  });

  describe('remove', () => {
    it('should call service.remove and return undefined (204 No Content)', async () => {
      mockTripsService.remove.mockResolvedValue(mockTrip);

      const result = await controller.remove(1);

      expect(service.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockTrip);
    });
  });
});
