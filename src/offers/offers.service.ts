import { Injectable } from '@nestjs/common';
import { GetOffersDto } from './dto/get-offers-dto';
import { axiosInstance } from '../hepers/';
import { IOfferResponse } from './types';

@Injectable()
export class OffersService {
  async getAllOffers(routeInfo: GetOffersDto): Promise<IOfferResponse> {
    const response = await axiosInstance.post<IOfferResponse>(
      '/getalloffers',
      routeInfo,
    );
    return response.data;
  }
}
