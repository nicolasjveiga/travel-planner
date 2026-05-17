import { TripsService } from './trips.service';
import { Trip } from './interfaces/trip.interface';
import { QueryTripDto } from './dto/query-trip.dto';
import { CreateTripDto } from './dto/create-trip.dto';
export declare class TripsController {
    private readonly tripsService;
    constructor(tripsService: TripsService);
    create(createTripDto: CreateTripDto): Trip;
    findAll(query: QueryTripDto): Trip[];
    findOne(id: number): Trip;
    update(id: number, updateData: Partial<Trip>): Trip;
    remove(id: number): void;
}
