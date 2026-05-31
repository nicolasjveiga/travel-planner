import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Query,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';

import { TripsService } from './trips.service';

import { QueryTripDto } from './dto/query-trip.dto';
import { CreateTripDto } from './dto/create-trip.dto';

import { TripBusinessFilter } from './filters/trip-business.filter';

import { TransformInterceptor } from '../common/interceptors/transform.interceptor';

@UseFilters(TripBusinessFilter)
@UseInterceptors(TransformInterceptor)
@Controller('trips')
export class TripsController {
  constructor(
    private readonly tripsService: TripsService,
  ) { }

  @Post()
  async create(
    @Body() createTripDto: CreateTripDto,
  ) {
    return this.tripsService.create(createTripDto);
  }

  @Get()
  async findAll(
    @Query() query: QueryTripDto,
  ) {
    return this.tripsService.findAll(
      query.destination,
      query.page,
    );
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.tripsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    updateData: Partial<CreateTripDto>,
  ) {
    return this.tripsService.update(
      id,
      updateData,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.tripsService.remove(id);
  }
}