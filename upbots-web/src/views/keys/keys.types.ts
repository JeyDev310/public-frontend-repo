export interface IVeeValidateCreateKey {
  exchange?: string;
  name: string;
  publicKey: string;
  secretKey: string;
  subAccountName?: string;
  password?: string;
}

export type TCreateKey = IVeeValidateCreateKey

export interface IVeeValidateEditKey {
  id?: string;
  name: string;
}

export type TEditKey = IVeeValidateEditKey
