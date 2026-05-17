import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    Logger,
} from '@nestjs/common';

import { Request, Response } from 'express';
import { InvalidTripDateException } from '../exceptions/invalid-trip-date.exception';

@Catch(InvalidTripDateException)
export class TripBusinessFilter implements ExceptionFilter {
    private readonly logger = new Logger(TripBusinessFilter.name);

    catch(exception: InvalidTripDateException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();

        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const status = exception.getStatus();

        this.logger.warn(
            `[${request.method}] ${request.url} - Tentativa de criar viagem com datas inválidas.`,
        );

        response.status(status).json({
            success: false,
            error: 'Trip Business Rule Violation',
            message: exception.message,
            suggestion:
                'Verifique se a data final da viagem é posterior à data inicial.',
            timestamp: new Date().toISOString(),
        });
    }
}