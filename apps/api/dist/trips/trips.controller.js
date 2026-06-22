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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const trips_service_1 = require("./trips.service");
const query_trip_dto_1 = require("./dto/query-trip.dto");
const create_trip_dto_1 = require("./dto/create-trip.dto");
const trip_business_filter_1 = require("./filters/trip-business.filter");
const transform_interceptor_1 = require("../common/interceptors/transform.interceptor");
let TripsController = class TripsController {
    constructor(tripsService) {
        this.tripsService = tripsService;
    }
    async create(createTripDto) {
        return this.tripsService.create(createTripDto);
    }
    async findAll(query) {
        return this.tripsService.findAll(query.destination, query.page);
    }
    async findOne(id) {
        return this.tripsService.findOne(id);
    }
    async update(id, updateData) {
        return this.tripsService.update(id, updateData);
    }
    async remove(id) {
        return this.tripsService.remove(id);
    }
};
exports.TripsController = TripsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Cria uma nova viagem' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Viagem criada com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Dados de requisição inválidos (ex: datas incorretas)' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_trip_dto_1.CreateTripDto]),
    __metadata("design:returntype", Promise)
], TripsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Lista todas as viagens com paginação e filtro por destino' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de viagens retornada com sucesso' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_trip_dto_1.QueryTripDto]),
    __metadata("design:returntype", Promise)
], TripsController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Busca detalhes de uma viagem pelo ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Viagem encontrada com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Viagem não encontrada' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TripsController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Atualiza parcialmente uma viagem pelo ID' }),
    (0, swagger_1.ApiBody)({ type: create_trip_dto_1.CreateTripDto, description: 'Campos a serem atualizados na viagem' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Viagem atualizada com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Dados de requisição inválidos' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Viagem não encontrada' }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TripsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Remove uma viagem pelo ID' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Viagem removida com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Viagem não encontrada' }),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TripsController.prototype, "remove", null);
exports.TripsController = TripsController = __decorate([
    (0, swagger_1.ApiTags)('trips'),
    (0, common_1.UseFilters)(trip_business_filter_1.TripBusinessFilter),
    (0, common_1.UseInterceptors)(transform_interceptor_1.TransformInterceptor),
    (0, common_1.Controller)('trips'),
    __metadata("design:paramtypes", [trips_service_1.TripsService])
], TripsController);
//# sourceMappingURL=trips.controller.js.map