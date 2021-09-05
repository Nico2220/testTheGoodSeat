import { Injectable } from '@nestjs/common';
import { axiosInstance } from '../hepers';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { ILoginResponse, IRegisterResponse } from './types';

@Injectable()
export class AuthService {
  async registerUser(
    resgisterUserDto: RegisterUserDto,
  ): Promise<IRegisterResponse> {
    const stringBody = JSON.stringify(resgisterUserDto);
    const response = await axiosInstance.post('/registeruser', stringBody);
    return response.data;
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<ILoginResponse> {
    const stringBody = JSON.stringify(loginUserDto);
    const response = await axiosInstance.post('/loginuser', stringBody);
    if (response.data.statusCode === 200) {
      axiosInstance.defaults.headers['usertoken'] = response.data.body.token;
    }
    return response.data;
  }
}
