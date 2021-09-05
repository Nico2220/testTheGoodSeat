import { Injectable } from '@nestjs/common';
import { axiosInstance } from '../hepers';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@Injectable()
export class AuthService {
  async registerUser(
    resgisterUserDto: RegisterUserDto,
  ): Promise<RegisterResponseDto> {
    const stringBody = JSON.stringify(resgisterUserDto);
    const response = await axiosInstance.post('/registeruser', stringBody);
    return response.data;
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<LoginResponseDto> {
    const stringBody = JSON.stringify(loginUserDto);
    const response = await axiosInstance.post('/loginuser', stringBody);
    if (response.data.statusCode === 200) {
      axiosInstance.defaults.headers['usertoken'] = response.data.body.token;
    }
    return response.data;
  }
}
