import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/registeruser')
  @ApiBody({ type: RegisterUserDto })
  registerUser(@Body() resgisterUserDto: RegisterUserDto) {
    return this.authService.registerUser(resgisterUserDto);
  }

  @Post('/loginuser')
  @ApiBody({ type: LoginUserDto })
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }
}
