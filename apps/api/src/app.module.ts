import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { TripsModule } from './trips/trips.module';
import { DaysModule } from './days/days.module';
import { ActivitiesModule } from './activities/activities.module';
import { TouristSpotModule } from './tourist-spot/tourist-spot.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AdminController } from './auth/admin.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    TripsModule,
    DaysModule,
    ActivitiesModule,
    TouristSpotModule,
    PrismaModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}