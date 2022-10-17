
import { IUser } from '../account/account.types'

export interface ILogin {
  // eslint-disable-next-line camelcase
  access_token: string;
  require2FA: boolean;
  user: IUser;
}

export interface IRegister {
  // eslint-disable-next-line camelcase
  access_token: string;
  user: IUser;
}
