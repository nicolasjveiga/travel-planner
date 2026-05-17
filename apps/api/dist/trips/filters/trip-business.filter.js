"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TripBusinessFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripBusinessFilter = void 0;
const common_1 = require("@nestjs/common");
const invalid_trip_date_exception_1 = require("../exceptions/invalid-trip-date.exception");
let TripBusinessFilter = TripBusinessFilter_1 = class TripBusinessFilter {
    constructor() {
        this.logger = new common_1.Logger(TripBusinessFilter_1.name);
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        this.logger.warn(`[${request.method}] ${request.url} - Tentativa de criar viagem com datas inválidas.`);
        response.status(status).json({
            success: false,
            error: 'Trip Business Rule Violation',
            message: exception.message,
            suggestion: 'Verifique se a data final da viagem é posterior à data inicial.',
            timestamp: new Date().toISOString(),
        });
    }
};
exports.TripBusinessFilter = TripBusinessFilter;
exports.TripBusinessFilter = TripBusinessFilter = TripBusinessFilter_1 = __decorate([
    (0, common_1.Catch)(invalid_trip_date_exception_1.InvalidTripDateException)
], TripBusinessFilter);
//# sourceMappingURL=trip-business.filter.js.map