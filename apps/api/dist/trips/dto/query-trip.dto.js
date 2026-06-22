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
exports.QueryTripDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class QueryTripDto {
    constructor() {
        this.page = 1;
    }
}
exports.QueryTripDto = QueryTripDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Rio de Janeiro',
        description: 'Filtro por destino da viagem',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({
        message: 'O filtro deve ser uma string válida.',
    }),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    __metadata("design:type", String)
], QueryTripDto.prototype, "destination", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 1,
        description: 'Número da página de resultados',
        default: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)({ message: 'A página deve ser um número inteiro.' }),
    (0, class_validator_1.Min)(1, { message: 'A página mínima é 1.' }),
    __metadata("design:type", Number)
], QueryTripDto.prototype, "page", void 0);
//# sourceMappingURL=query-trip.dto.js.map