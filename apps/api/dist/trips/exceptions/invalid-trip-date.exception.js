"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidTripDateException = void 0;
const common_1 = require("@nestjs/common");
class InvalidTripDateException extends common_1.HttpException {
    constructor(startDate, endDate) {
        super(`A data final (${endDate.toLocaleDateString()}) não pode ser menor que a data inicial (${startDate.toLocaleDateString()}).`, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
    }
}
exports.InvalidTripDateException = InvalidTripDateException;
//# sourceMappingURL=invalid-trip-date.exception.js.map