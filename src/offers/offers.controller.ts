import { Body, Controller, Post } from '@nestjs/common';
import { GetOffersDto } from './dto/get-offers-dto';
import { OffersService } from './offers.service';
import { IOfferResponse } from './types';

@Controller('offers')
export class OffersController {
  constructor(private offersService: OffersService) {}

  @Post()
  getAllOffers(@Body() getOffersDto: GetOffersDto): Promise<IOfferResponse> {
    return this.offersService.getAllOffers(getOffersDto);
  }
}
