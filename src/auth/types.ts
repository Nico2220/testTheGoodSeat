import { IUser } from './user.model';

interface IBody {
  userExists: boolean;
  user: IUser;
}

export interface IRegisterResponse {
  statusCode: number;
  body: IBody;
  userToken: string;
  isBase64Encoded: boolean;
  headers: {
    'Content-Type': 'application/json';
  };
}

interface UserInfo {
  email: 'nic@gmail.com';
  firstname: 'Kim';
  lastname: 'Hernandez';
  phonenumber: '+33667182291';
  country: 'France';
}

export interface ILoginResponse {
  statusCode: number;
  body: {
    userInfo: UserInfo;
  };
  token: string;
  isBase64Encoded: boolean;
  headers: {
    'Content-Type': 'application/json';
  };
}
