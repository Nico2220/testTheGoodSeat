import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiHeader,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetOffersDto } from './dto/get-offers-dto';
import { OffersService } from './offers.service';
import { OfferDto, OfferResponseDto } from './dto/allOffers.dto';

@ApiTags('Get all offers from The Good Seat partners')
@Controller('offers')
export class OffersController {
  constructor(private offersService: OffersService) {}

  @Post()
  @ApiResponse({
    type: () => OfferResponseDto,
    status: 200,
  })
  @ApiBody({ type: GetOffersDto })
  getAllOffers(@Body() getOffersDto: GetOffersDto): Promise<OfferDto> {
    return this.offersService.getAllOffers(getOffersDto);
  }
}
