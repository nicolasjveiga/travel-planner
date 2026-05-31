import { PrismaService } from '../prisma/prisma.service';
import { CreateTripDto } from './dto/create-trip.dto';
export declare class TripsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createTripDto: CreateTripDto): Promise<{
        id: number;
        title: string;
        destination: string;
        startDate: Date;
        endDate: Date;
        userId: number;
    }>;
    findAll(destination?: string, page?: number): Promise<{
        id: number;
        title: string;
        destination: string;
        startDate: Date;
        endDate: Date;
        userId: number;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        title: string;
        destination: string;
        startDate: Date;
        endDate: Date;
        userId: number;
    }>;
    update(id: number, updateData: Partial<CreateTripDto>): Promise<{
        id: number;
        title: string;
        destination: string;
        startDate: Date;
        endDate: Date;
        userId: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        title: string;
        destination: string;
        startDate: Date;
        endDate: Date;
        userId: number;
    }>;
}
