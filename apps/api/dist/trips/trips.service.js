"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const invalid_trip_date_exception_1 = require("./exceptions/invalid-trip-date.exception");
let TripsService = class TripsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createTripDto) {
        const startDate = new Date(createTripDto.startDate);
        const endDate = new Date(createTripDto.endDate);
        if (endDate < startDate) {
            throw new invalid_trip_date_exception_1.InvalidTripDateException(startDate, endDate);
        }
        return this.prisma.trip.create({
            data: {
                ...createTripDto,
                startDate,
                endDate,
            },
        });
    }
    async findAll(destination, page = 1) {
        const pageSize = 5;
        return this.prisma.trip.findMany({
            where: destination
                ? {
                    destination: {
                        contains: destination,
                    },
                }
                : {},
            skip: (page - 1) * pageSize,
            take: pageSize,
        });
    }
    async findOne(id) {
        const trip = await this.prisma.trip.findUnique({
            where: { id },
        });
        if (!trip) {
            throw new common_1.NotFoundException(`Trip with ID ${id} not found`);
        }
        return trip;
    }
    async update(id, updateData) {
        await this.findOne(id);
        let startDate = updateData.startDate;
        let endDate = updateData.endDate;
        if (updateData.startDate) {
            startDate = new Date(updateData.startDate);
        }
        if (updateData.endDate) {
            endDate = new Date(updateData.endDate);
        }
        if (startDate && endDate) {
            if (endDate < startDate) {
                throw new invalid_trip_date_exception_1.InvalidTripDateException(startDate, endDate);
            }
        }
        return this.prisma.trip.update({
            where: { id },
            data: {
                ...updateData,
                startDate,
                endDate,
            },
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.trip.delete({
            where: { id },
        });
    }
};
exports.TripsService = TripsService;
exports.TripsService = TripsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TripsService);
//# sourceMappingURL=trips.service.js.map