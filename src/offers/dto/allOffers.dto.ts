import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OfferDto {
  @ApiProperty({
    type: 'string',
    name: 'offerId',
  })
  offerId: string;
  @ApiProperty()
  providerCode: string;
  @ApiProperty()
  category: string;
  @ApiProperty()
  price: number;
  @ApiProperty({
    type: 'number',
  })
  arrivalTime: number;
  @ApiProperty()
  currency: string;
  @ApiProperty()
  internalDeeplinkUrl: string;
}

class Headers {
  @ApiProperty({
    type: 'string',
    default: 'application/json',
  })
  'Content-Type': string;
}

export class OfferResponseDto {
  @ApiProperty({
    default: 200,
  })
  statusCode: number;
  @ApiProperty({
    type: OfferDto,
    isArray: true,
  })
  body: OfferDto[];

  @ApiProperty({
    type: 'boolean',
    default: false,
  })
  isBase64Encoded: boolean;

  @ApiProperty({
    type: Headers,
  })
  headers: Headers;
}
