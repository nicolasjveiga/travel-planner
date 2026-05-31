import { TripsService } from './trips.service';
import { QueryTripDto } from './dto/query-trip.dto';
import { CreateTripDto } from './dto/create-trip.dto';
export declare class TripsController {
    private readonly tripsService;
    constructor(tripsService: TripsService);
    create(createTripDto: CreateTripDto): Promise<{
        title: string;
        destination: string;
        startDate: Date;
        endDate: Date;
        id: number;
        userId: number;
    }>;
    findAll(query: QueryTripDto): Promise<{
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
