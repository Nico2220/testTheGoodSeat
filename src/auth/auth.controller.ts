import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { RegisterResponseDto } from './dto/register-response.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/registeruser')
  @ApiBody({ type: RegisterUserDto })
  @ApiCreatedResponse({
    status: 201,
    type: RegisterResponseDto,
  })
  registerUser(@Body() resgisterUserDto: RegisterUserDto) {
    return this.authService.registerUser(resgisterUserDto);
  }

  @Post('/loginuser')
  @ApiBody({ type: LoginUserDto })
  @ApiCreatedResponse({
    status: 201,
    type: LoginResponseDto,
  })
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }
}
