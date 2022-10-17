export enum EKeyType {
  SPOT = 'spot',
  FUTURE = 'future'
}

export interface IKey {
  id: string;
  name: string;
  created: string;
  exchange: string;
  type: string;
  quoteCurrency?: string;
  publicKey: string;
  valid: boolean;
  lastHealthCheck: string;
  updated: string;
  displayName?: string;
}

type TRoles = 'ADMIN' | 'SUPPORT' | 'MTRADE' | 'DEVELOPER'

export enum ERoles {
  ADMIN = 'ADMIN',
  SUPPORT = 'SUPPORT',
  MTRADE = 'MTRADE',
  DEVELOPER = 'DEVELOPER',
}

type TAuthProvider = 'LOCAL' | 'GOOGLE' | 'FACEBOOK'

export interface IUser {
  id: string;
  idFromDb: string;
  email: string;
  firstname: string;
  lastname: string;
  telegram: string;
  tgChatId: string;
  tgChatIdDraft: string;
  tgConfirmCode: string;
  phone: string;
  roles: TRoles[];
  emailVerified: boolean;
  picture: {
    mimetype: string;
    data: string;
  };
  homeAddress: string;
  country: string;
  city: string;
  aboutMe: string;
  password: string;
  passwordModified: string;
  passwordModifiedCount: number;
  // seller: boolean;
  // address: Address;
  created: string;
  /**
   * 2FA has been asked (temporary) set when this field is set and twoFactorSecret not set yet.
   */
  twoFactorTempSecret: string;
  /**
   * 2FA activated when this field is set.
   */
  twoFactorSecret: string;
  /**
   * this user requires 2FA for login (default to false).
   */
  totpRequired: boolean;
  /**
   * reset 2fa code
   */
  reset2faCode: string;
  is2faDisabled: boolean;
  verification: {
    code: string;
    codeExpiration: string;
    emailVerified: boolean;
  };
  passwordReset: {
    code: string;
    codeExpiration: string;
  };
  custodialWallets: {
    identifier: string;
    pincode: string;
    ubxtDeposit: string;
    ubxtDebt: string;
    withdrawExpiry: string;
    ethAddress: string;
    bscAddress: string;
  };

  // ubxt staking amount
  ubxtStakingAmount: number;
  botsAccess: boolean;

  // auth provider, local strategy by default
  authProvider: TAuthProvider;
}

export interface IUpdateUser {
  country: string;
  firstname: string;
  homeAddress: string;
  id: string;
  idFromDb: string;
  lastname: string;
  phone: string;
}
export interface IUpdateUserData {
  user: IUpdateUser;
}
