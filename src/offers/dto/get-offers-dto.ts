import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class GetOffersDto {
  @ApiProperty()
  @IsNotEmpty()
  startLatitude: number;

  @ApiProperty()
  @IsNotEmpty()
  startLongitude: number;

  @ApiProperty()
  @IsNotEmpty()
  endLatitude: number;

  @ApiProperty()
  @IsNotEmpty()
  endLongitude: number;
}
