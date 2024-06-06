interface IUserLogin {
    email: string;
    password: string;
}

interface IUserRegister extends IUserLogin {
    avatar: string;
    name: string;
    confirmPassword: string;
}

interface IUser {
  id: string;
  email: string;
  name: string;
  avatar: string;
  role: string;
  status: boolean;
  isVerifiedEmail: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
}

interface IUserLoginResponse {
    credentails: IUser;
    accessToken: string;
}


export type { IUserLogin, IUserRegister, IUser, IUserLoginResponse};