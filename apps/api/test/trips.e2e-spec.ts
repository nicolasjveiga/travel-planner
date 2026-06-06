import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from './../src/prisma/prisma.service';
import { HttpExceptionFilter } from './../src/common/filters/http-exception.filter';

describe('TripsController (e2e)', () => {
  let app: INestApplication;

  const mockTrip = {
    id: 1,
    title: 'Minha Viagem',
    destination: 'Lisboa',
    startDate: new Date('2026-08-01T00:00:00.000Z'),
    endDate: new Date('2026-08-10T00:00:00.000Z'),
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
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    app = moduleFixture.createNestApplication();

    // Register same global filters and pipes as main.ts
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );
    app.useGlobalFilters(new HttpExceptionFilter());

    await app.init();
    jest.clearAllMocks();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('POST /trips', () => {
    it('should create a trip successfully and wrap the response', async () => {
      mockPrismaService.trip.create.mockResolvedValue(mockTrip);

      const payload = {
        title: 'Minha Viagem',
        destination: 'Lisboa',
        startDate: '2026-08-01T00:00:00.000Z',
        endDate: '2026-08-10T00:00:00.000Z',
        userId: 1,
      };

      const response = await request(app.getHttpServer())
        .post('/trips')
        .send(payload)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(payload.title);
      expect(response.body.data.destination).toBe(payload.destination);
      expect(mockPrismaService.trip.create).toHaveBeenCalled();
    });

    it('should return 400 Bad Request when payload is invalid (DTO validation)', async () => {
      const payload = {
        title: 'Oi', // Too short (MinLength is 3)
        destination: 'Lisboa',
        startDate: 'invalid-date',
        endDate: '2026-08-10T00:00:00.000Z',
        userId: 'not-a-number',
      };

      const response = await request(app.getHttpServer())
        .post('/trips')
        .send(payload)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.statusCode).toBe(400);
      expect(response.body.message).toBeDefined();
    });

    it('should return 422 Unprocessable Entity when endDate is before startDate', async () => {
      const payload = {
        title: 'Minha Viagem',
        destination: 'Lisboa',
        startDate: '2026-08-10T00:00:00.000Z',
        endDate: '2026-08-01T00:00:00.000Z',
        userId: 1,
      };

      const response = await request(app.getHttpServer())
        .post('/trips')
        .send(payload)
        .expect(422);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Trip Business Rule Violation');
      expect(response.body.suggestion).toContain('Verifique se a data final');
    });
  });

  describe('GET /trips', () => {
    it('should return wrapped list of trips', async () => {
      const tripsList = [mockTrip];
      mockPrismaService.trip.findMany.mockResolvedValue(tripsList);

      const response = await request(app.getHttpServer())
        .get('/trips?destination=Lisboa&page=1')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data[0].id).toBe(mockTrip.id);
      expect(mockPrismaService.trip.findMany).toHaveBeenCalled();
    });

    it('should fail with 400 when query parameter page is less than 1', async () => {
      const response = await request(app.getHttpServer())
        .get('/trips?page=0')
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.statusCode).toBe(400);
    });
  });

  describe('GET /trips/:id', () => {
    it('should return a trip by id', async () => {
      mockPrismaService.trip.findUnique.mockResolvedValue(mockTrip);

      const response = await request(app.getHttpServer())
        .get('/trips/1')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(1);
    });

    it('should return 404 when trip is not found', async () => {
      mockPrismaService.trip.findUnique.mockResolvedValue(null);

      const response = await request(app.getHttpServer())
        .get('/trips/99')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.statusCode).toBe(404);
      expect(response.body.message).toContain('not found');
    });

    it('should return 400 when id is not an integer', async () => {
      const response = await request(app.getHttpServer())
        .get('/trips/abc')
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.statusCode).toBe(400);
    });
  });

  describe('PUT /trips/:id', () => {
    it('should update a trip successfully', async () => {
      const updatedMockTrip = { ...mockTrip, title: 'Viagem Editada' };
      mockPrismaService.trip.findUnique.mockResolvedValue(mockTrip);
      mockPrismaService.trip.update.mockResolvedValue(updatedMockTrip);

      const payload = {
        title: 'Viagem Editada',
      };

      const response = await request(app.getHttpServer())
        .put('/trips/1')
        .send(payload)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(payload.title);
    });

    it('should return 422 Unprocessable Entity when updating dates incorrectly', async () => {
      mockPrismaService.trip.findUnique.mockResolvedValue(mockTrip);

      const payload = {
        startDate: '2026-08-20T00:00:00.000Z',
        endDate: '2026-08-10T00:00:00.000Z',
      };

      const response = await request(app.getHttpServer())
        .put('/trips/1')
        .send(payload)
        .expect(422);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Trip Business Rule Violation');
    });

    it('should return 404 when trying to update non-existent trip', async () => {
      mockPrismaService.trip.findUnique.mockResolvedValue(null);

      const payload = {
        title: 'Novo Título',
      };

      const response = await request(app.getHttpServer())
        .put('/trips/99')
        .send(payload)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.statusCode).toBe(404);
    });
  });

  describe('DELETE /trips/:id', () => {
    it('should delete a trip and return 204 No Content', async () => {
      mockPrismaService.trip.findUnique.mockResolvedValue(mockTrip);
      mockPrismaService.trip.delete.mockResolvedValue(mockTrip);

      await request(app.getHttpServer())
        .delete('/trips/1')
        .expect(204);

      expect(mockPrismaService.trip.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should return 404 when trying to delete non-existent trip', async () => {
      mockPrismaService.trip.findUnique.mockResolvedValue(null);

      const response = await request(app.getHttpServer())
        .delete('/trips/99')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.statusCode).toBe(404);
    });
  });
});
