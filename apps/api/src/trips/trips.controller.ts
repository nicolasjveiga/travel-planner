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
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

import { TripsService } from './trips.service';

import { QueryTripDto } from './dto/query-trip.dto';
import { CreateTripDto } from './dto/create-trip.dto';

import { TripBusinessFilter } from './filters/trip-business.filter';

import { TransformInterceptor } from '../common/interceptors/transform.interceptor';

@ApiTags('trips')
@UseFilters(TripBusinessFilter)
@UseInterceptors(TransformInterceptor)
@Controller('trips')
export class TripsController {
  constructor(
    private readonly tripsService: TripsService,
  ) { }

  @ApiOperation({ summary: 'Cria uma nova viagem' })
  @ApiResponse({ status: 201, description: 'Viagem criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados de requisição inválidos (ex: datas incorretas)' })
  @Post()
  async create(
    @Body() createTripDto: CreateTripDto,
  ) {
    return this.tripsService.create(createTripDto);
  }

  @ApiOperation({ summary: 'Lista todas as viagens com paginação e filtro por destino' })
  @ApiResponse({ status: 200, description: 'Lista de viagens retornada com sucesso' })
  @Get()
  async findAll(
    @Query() query: QueryTripDto,
  ) {
    return this.tripsService.findAll(
      query.destination,
      query.page,
    );
  }

  @ApiOperation({ summary: 'Busca detalhes de uma viagem pelo ID' })
  @ApiResponse({ status: 200, description: 'Viagem encontrada com sucesso' })
  @ApiResponse({ status: 404, description: 'Viagem não encontrada' })
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.tripsService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualiza parcialmente uma viagem pelo ID' })
  @ApiBody({ type: CreateTripDto, description: 'Campos a serem atualizados na viagem' })
  @ApiResponse({ status: 200, description: 'Viagem atualizada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados de requisição inválidos' })
  @ApiResponse({ status: 404, description: 'Viagem não encontrada' })
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

  @ApiOperation({ summary: 'Remove uma viagem pelo ID' })
  @ApiResponse({ status: 204, description: 'Viagem removida com sucesso' })
  @ApiResponse({ status: 404, description: 'Viagem não encontrada' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.tripsService.remove(id);
  }
}