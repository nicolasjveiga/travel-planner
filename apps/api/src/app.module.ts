import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { TripsModule } from './trips/trips.module';
import { DaysModule } from './days/days.module';
import { ActivitiesModule } from './activities/activities.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    TripsModule,
    DaysModule,
    ActivitiesModule,
  ],
})
export class AppModule { }