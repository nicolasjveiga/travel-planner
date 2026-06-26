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
import { Request } from 'express';
import { Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { TripsService } from './trips.service';
import { QueryTripDto } from './dto/query-trip.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTripDto } from './dto/create-trip.dto';
import { TripBusinessFilter } from './filters/trip-business.filter';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';

@ApiTags('trips')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
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
    @Req() req?: any,
  ) {
    const user = req?.user ?? req;
    return this.tripsService.create(
      createTripDto,
      user,
    );
  }
  @ApiOperation({ summary: 'Lista todas as viagens com paginação e filtro por destino' })
  @ApiResponse({ status: 200, description: 'Lista de viagens retornada com sucesso' })
  @Get()
  async findAll(
    @Query() query: QueryTripDto,
    @Req() req?: any,
  ) {
    const user = req?.user ?? req;
    return this.tripsService.findAll(
      user,
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
    @Req() req?: any,
  ) {
    const user = req?.user ?? req;
    return this.tripsService.findOne(id, user);
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
    @Req() req?: any,
  ) {
    const user = req?.user ?? req;
    if (user && user.id && user.role) {
      return this.tripsService.update(
        id,
        user,
        updateData,
      );
    }

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
    @Req() req?: any,
  ) {
    const user = req?.user ?? req;
    if (user && user.id && user.role) {
      return this.tripsService.remove(id, user);
    }

    return this.tripsService.remove(id);
  }
}