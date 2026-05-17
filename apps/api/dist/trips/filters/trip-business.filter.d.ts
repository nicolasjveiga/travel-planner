import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { InvalidTripDateException } from '../exceptions/invalid-trip-date.exception';
export declare class TripBusinessFilter implements ExceptionFilter {
    private readonly logger;
    catch(exception: InvalidTripDateException, host: ArgumentsHost): void;
}
