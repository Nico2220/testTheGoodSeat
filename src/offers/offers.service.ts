import { Injectable } from '@nestjs/common';
import { GetOffersDto } from './dto/get-offers-dto';
import { axiosInstance } from '../hepers/';
import { OfferDto } from './dto/allOffers.dto';

@Injectable()
export class OffersService {
  async getAllOffers(routeInfo: GetOffersDto): Promise<OfferDto> {
    const response = await axiosInstance.post('/getalloffers', routeInfo);
    return response.data;
  }
}
