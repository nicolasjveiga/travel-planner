import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { TripsModule } from './trips/trips.module';
import { DaysModule } from './days/days.module';
import { ActivitiesModule } from './activities/activities.module';
import { TouristSpotModule } from './tourist-spot/tourist-spot.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    TripsModule,
    DaysModule,
    ActivitiesModule,
    TouristSpotModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}