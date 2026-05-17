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
exports.CreateTripDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateTripDto {
}
exports.CreateTripDto = CreateTripDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'O título deve ser uma string válida.' }),
    (0, class_validator_1.MinLength)(3, {
        message: 'O título deve possuir no mínimo 3 caracteres.',
    }),
    __metadata("design:type", String)
], CreateTripDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'O destino deve ser uma string válida.' }),
    __metadata("design:type", String)
], CreateTripDto.prototype, "destination", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)({
        message: 'A data inicial deve possuir formato válido.',
    }),
    __metadata("design:type", Date)
], CreateTripDto.prototype, "startDate", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)({
        message: 'A data final deve possuir formato válido.',
    }),
    __metadata("design:type", Date)
], CreateTripDto.prototype, "endDate", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)({ message: 'O userId deve ser um número inteiro.' }),
    (0, class_validator_1.Min)(1, { message: 'O userId deve ser maior que 0.' }),
    __metadata("design:type", Number)
], CreateTripDto.prototype, "userId", void 0);
//# sourceMappingURL=create-trip.dto.js.map