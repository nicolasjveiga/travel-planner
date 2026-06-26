import { TripsService } from './trips.service';
import { QueryTripDto } from './dto/query-trip.dto';
import { CreateTripDto } from './dto/create-trip.dto';
export declare class TripsController {
    private readonly tripsService;
    constructor(tripsService: TripsService);
    create(createTripDto: CreateTripDto, req?: any): Promise<{
        id: number;
        title: string;
        destination: string;
        startDate: Date;
        endDate: Date;
        userId: number;
    }>;
    findAll(query: QueryTripDto, req?: any): Promise<{
        id: number;
        title: string;
        destination: string;
        startDate: Date;
        endDate: Date;
        userId: number;
    }[]>;
    findOne(id: number, req?: any): Promise<{
        id: number;
        title: string;
        destination: string;
        startDate: Date;
        endDate: Date;
        userId: number;
    }>;
    update(id: number, updateData: Partial<CreateTripDto>, req?: any): Promise<{
        id: number;
        title: string;
        destination: string;
        startDate: Date;
        endDate: Date;
        userId: number;
    }>;
    remove(id: number, req?: any): Promise<{
        id: number;
        title: string;
        destination: string;
        startDate: Date;
        endDate: Date;
        userId: number;
    }>;
}
