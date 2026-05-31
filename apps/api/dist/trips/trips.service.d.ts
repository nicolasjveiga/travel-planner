import { PrismaService } from '../prisma/prisma.service';
import { CreateTripDto } from './dto/create-trip.dto';
export declare class TripsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createTripDto: CreateTripDto): Promise<{
        title: string;
        destination: string;
        startDate: Date;
        endDate: Date;
        id: number;
        userId: number;
    }>;
    findAll(destination?: string, page?: number): Promise<{
        title: string;
        destination: string;
        startDate: Date;
        endDate: Date;
        id: number;
        userId: number;
    }[]>;
    findOne(id: number): Promise<{
        title: string;
        destination: string;
        startDate: Date;
        endDate: Date;
        id: number;
        userId: number;
    }>;
    update(id: number, updateData: Partial<CreateTripDto>): Promise<{
        title: string;
        destination: string;
        startDate: Date;
        endDate: Date;
        id: number;
        userId: number;
    }>;
    remove(id: number): Promise<{
        title: string;
        destination: string;
        startDate: Date;
        endDate: Date;
        id: number;
        userId: number;
    }>;
}
