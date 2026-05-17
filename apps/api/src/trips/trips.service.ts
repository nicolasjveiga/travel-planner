import { Injectable, NotFoundException } from '@nestjs/common';
import { Trip } from './interfaces/trip.interface';
import { CreateTripDto } from './dto/create-trip.dto';

@Injectable()
export class TripsService {
  private trips: Trip[] = [];
  private idCounter = 1;

  create(tripData: CreateTripDto): Trip {
    const newTrip: Trip = {
      id: this.idCounter++,
      ...tripData,
    };

    this.trips.push(newTrip);

    return newTrip;
  }

  findAll(destination?: string, page: number = 1): Trip[] {
    let result = this.trips;

    if (destination) {
      result = result.filter((trip) =>
        trip.destination
          .toLowerCase()
          .includes(destination.toLowerCase()),
      );
    }

    const pageSize = 5;

    return result.slice(
      (page - 1) * pageSize,
      page * pageSize,
    );
  }

  findOne(id: number): Trip {
    const trip = this.trips.find((t) => t.id === id);

    if (!trip) {
      throw new NotFoundException(
        `Trip with ID ${id} not found`,
      );
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