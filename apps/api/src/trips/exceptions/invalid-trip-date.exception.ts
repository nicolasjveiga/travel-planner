import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidTripDateException extends HttpException {
    constructor(startDate: Date, endDate: Date) {
        super(
            `A data final (${endDate.toLocaleDateString()}) não pode ser menor que a data inicial (${startDate.toLocaleDateString()}).`,
            HttpStatus.UNPROCESSABLE_ENTITY,
        );
    }
}