// INTERFACES
export interface IVeeValidateLogin {
  email: string;
  password: string;
}

export interface IVeeValidateConfirmNewIp {
  email: string;
  password: string;
  code: string;
}

export interface IVeeValidateRegister {
  email: string;
  firstName: string;
  password: string;
}
export interface IVeeValidateTwoFactorAuth {
  code: string;
}

export interface IVeeValidateRecover {
  email: string;
}

export interface IVeeValidateReset {
  password: string;
  confirmPassword: string;
}

// ENUMS
export enum EValidation {
  // eslint-disable-next-line max-len
  PASSWORD = 'Minimum 8 characters, at least one letter and one number',
  PASSWORD_CONFIRMATION = 'Password confirmation does not match'
}

export interface ILoginRequestPayload {
  email: string;
  password: string;
}

export interface IConfirmNewIpRequestPayload {
  email: string;
  password: string;
  code: string;
}

export interface IRegisterRequestPayload extends ILoginRequestPayload {
  captcha: string;
  firstname: string;
  password2: string;
  refCode?: string;
}

export interface IRecoverPasswordPayload {
  email: string;
}

export interface IRecover2FaCode {
  email: string;
  recoverCode?: string;
}

export interface IEmailVerificationPayload {
  email?: string;
  code?: string;
}
export interface IResetPasswordPayload {
  newPassword: string;
  repeatNewPassword: string;
  code: string;
}
export interface ITotpTokenRequestPayload {
  userToken: string;
}

export enum ELoginErrorCodes {
  NewIpAddress = 'NEW_IP_ADDRESS'
}
