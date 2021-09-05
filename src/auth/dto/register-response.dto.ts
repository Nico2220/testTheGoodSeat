import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class User {
  @ApiProperty()
  ID: number;
  @ApiProperty()
  email: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  birthDate: string;
  @ApiProperty()
  phoneNumber: string;
  @ApiProperty({
    default: 1,
  })
  isActive: number;
}

class Headers {
  @ApiProperty({
    type: 'string',
    default: 'application/json',
  })
  'Content-Type': string;
}

class Body {
  @ApiProperty({
    type: 'boolean',
    default: true,
  })
  userExists: boolean;
  @ApiProperty({
    type: User,
  })
  user: User;
}

export class RegisterResponseDto {
  @ApiProperty({
    type: 'number',
    default: 200,
  })
  statusCode: number;

  @ApiProperty({
    type: Body,
  })
  body: Body;

  @ApiProperty()
  userToken: string;

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
