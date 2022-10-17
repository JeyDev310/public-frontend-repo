export interface IMainProfile {
  firstname?: string;
  lastname?: string;
  username?: string;
  country?: string;
  homeAddress?: string;
  phone?: string;
  email?: string;
  telegram?: string;
  password?: string;
}
export type TVeeValidateMainProfile = IMainProfile

export interface IVeeValidateEditEmail {
  currentEmail: string;
  newEmail: string;
}

export interface IChangePassword {
  password: string;
  newPassword: string;
  repeatNewPassword: string;
  email?: string;
}

export interface IVeeValidateChangePassword {
  password: string;
  newPassword: string;
  repeatNewPassword: string;
}

export interface IVeeValidateCreateTwoFactorAuth {
  code: string;
}
