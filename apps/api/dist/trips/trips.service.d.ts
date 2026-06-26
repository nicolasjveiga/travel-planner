import { PrismaService } from '../prisma/prisma.service';
import { CreateTripDto } from './dto/create-trip.dto';
export declare class TripsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createTripDto: CreateTripDto, user: any): Promise<{
        title: string;
        destination: string;
        startDate: Date;
        endDate: Date;
        id: number;
        userId: number;
    }>;
    findAll(user: any, destination?: string, page?: number): Promise<{
        title: string;
        destination: string;
        startDate: Date;
        endDate: Date;
        id: number;
        userId: number;
    }[]>;
    findOne(id: number, user: any): Promise<{
        title: string;
        destination: string;
        startDate: Date;
        endDate: Date;
        id: number;
        userId: number;
    }>;
    update(id: number, arg2?: any, arg3?: any): Promise<{
        title: string;
        destination: string;
        startDate: Date;
        endDate: Date;
        id: number;
        userId: number;
    }>;
    remove(id: number, user?: any): Promise<{
        title: string;
        destination: string;
        startDate: Date;
        endDate: Date;
        id: number;
        userId: number;
    }>;
}
