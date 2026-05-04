import { Injectable, NotFoundException } from '@nestjs/common';
import { Trip } from './interfaces/trip.interface';

@Injectable()
export class TripsService {
  private trips: Trip[] = [];
  private idCounter = 1;

  create(tripData: Omit<Trip, 'id'>): Trip {
    const newTrip: Trip = {
      id: this.idCounter++,
      ...tripData,
    };
    this.trips.push(newTrip);
    return newTrip;
  }

  findAll(): Trip[] {
    return this.trips;
  }

  findOne(id: number): Trip {
    const trip = this.trips.find((t) => t.id === id);
    if (!trip) {
      throw new NotFoundException(`Trip with ID ${id} not found`);
    }
    return trip;
  }

  update(id: number, updateData: Partial<Trip>): Trip {
    const trip = this.findOne(id);
    const updatedTrip = { ...trip, ...updateData, id };

    const index = this.trips.findIndex((t) => t.id === id);
    this.trips[index] = updatedTrip;

    return updatedTrip;
  }

  remove(id: number): void {
    const index = this.trips.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new NotFoundException(`Trip with ID ${id} not found`);
    }
    this.trips.splice(index, 1);
  }
}