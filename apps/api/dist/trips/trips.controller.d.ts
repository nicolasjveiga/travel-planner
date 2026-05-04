import { TripsService } from './trips.service';
import { Trip } from './interfaces/trip.interface';
export declare class TripsController {
    private readonly tripsService;
    constructor(tripsService: TripsService);
    create(tripData: Omit<Trip, 'id'>): Trip;
    findAll(): Trip[];
    findOne(id: number): Trip;
    update(id: number, updateData: Partial<Trip>): Trip;
    remove(id: number): void;
}
