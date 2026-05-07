import { Trip } from './interfaces/trip.interface';
import { CreateTripDto } from './dto/create-trip.dto';
export declare class TripsService {
    private trips;
    private idCounter;
    create(tripData: CreateTripDto): Trip;
    findAll(destination?: string, page?: number): Trip[];
    findOne(id: number): Trip;
    update(id: number, updateData: Partial<Trip>): Trip;
    remove(id: number): void;
}
