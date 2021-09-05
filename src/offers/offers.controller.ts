import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetOffersDto } from './dto/get-offers-dto';
import { OffersService } from './offers.service';
import { IOfferResponse } from './types';

@ApiTags('Get all offers from The Good Seat partners')
@Controller('offers')
export class OffersController {
  constructor(private offersService: OffersService) {}

  @Post()
  @ApiBody({ type: GetOffersDto })
  getAllOffers(@Body() getOffersDto: GetOffersDto): Promise<IOfferResponse> {
    return this.offersService.getAllOffers(getOffersDto);
  }
}
