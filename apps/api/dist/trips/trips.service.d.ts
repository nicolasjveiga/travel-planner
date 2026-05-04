import { Trip } from './interfaces/trip.interface';
export declare class TripsService {
    private trips;
    private idCounter;
    create(tripData: Omit<Trip, 'id'>): Trip;
    findAll(): Trip[];
    findOne(id: number): Trip;
    update(id: number, updateData: Partial<Trip>): Trip;
    remove(id: number): void;
}
