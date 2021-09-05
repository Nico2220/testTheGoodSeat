import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { OffersModule } from './offers/offers.module';

@Module({
  imports: [AuthModule, OffersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
