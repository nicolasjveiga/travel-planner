import { HttpException } from '@nestjs/common';
export declare class InvalidTripDateException extends HttpException {
    constructor(startDate: Date, endDate: Date);
}
