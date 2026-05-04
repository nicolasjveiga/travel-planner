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
} from '@nestjs/common';
import { TripsService } from './trips.service';
import { Trip } from './interfaces/trip.interface';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() tripData: Omit<Trip, 'id'>): Trip {
    return this.tripsService.create(tripData);
  }

  @Get()
  findAll(): Trip[] {
    return this.tripsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Trip {
    return this.tripsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<Trip>,
  ): Trip {
    return this.tripsService.update(id, updateData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): void {
    return this.tripsService.remove(id);
  }
}

