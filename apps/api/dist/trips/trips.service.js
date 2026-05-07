"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripsService = void 0;
const common_1 = require("@nestjs/common");
let TripsService = class TripsService {
    constructor() {
        this.trips = [];
        this.idCounter = 1;
    }
    create(tripData) {
        const newTrip = {
            id: this.idCounter++,
            ...tripData,
        };
        this.trips.push(newTrip);
        return newTrip;
    }
    findAll(destination, page = 1) {
        let result = this.trips;
        if (destination) {
            result = result.filter((trip) => trip.destination
                .toLowerCase()
                .includes(destination.toLowerCase()));
        }
        const pageSize = 5;
        return result.slice((page - 1) * pageSize, page * pageSize);
    }
    findOne(id) {
        const trip = this.trips.find((t) => t.id === id);
        if (!trip) {
            throw new common_1.NotFoundException(`Trip with ID ${id} not found`);
        }
        return trip;
    }
    update(id, updateData) {
        const trip = this.findOne(id);
        const updatedTrip = { ...trip, ...updateData, id };
        const index = this.trips.findIndex((t) => t.id === id);
        this.trips[index] = updatedTrip;
        return updatedTrip;
    }
    remove(id) {
        const index = this.trips.findIndex((t) => t.id === id);
        if (index === -1) {
            throw new common_1.NotFoundException(`Trip with ID ${id} not found`);
        }
        this.trips.splice(index, 1);
    }
};
exports.TripsService = TripsService;
exports.TripsService = TripsService = __decorate([
    (0, common_1.Injectable)()
], TripsService);
//# sourceMappingURL=trips.service.js.map