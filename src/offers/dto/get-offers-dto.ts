import { IsNotEmpty } from 'class-validator';
export class GetOffersDto {
  @IsNotEmpty()
  startLatitude: number;

  @IsNotEmpty()
  startLongitude: number;

  @IsNotEmpty()
  endLatitude: number;

  @IsNotEmpty()
  endLongitude: number;
}
