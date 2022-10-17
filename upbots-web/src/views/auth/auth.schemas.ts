import { object, string, ref, SchemaOf } from 'yup'
import {
  EValidation,
  IVeeValidateLogin,
  IVeeValidateRegister,
  IVeeValidateTwoFactorAuth,
  IVeeValidateRecover,
  IVeeValidateReset
} from '@/types'

const emailSchema = object({
  email: string().email().required().label('Email')
})

export const passwordSchema = object({
  password: string().min(8).max(64).required().matches(
    /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
    EValidation.PASSWORD
  ).label('Password')
})

export const confirmPasswordSchema = object({
  confirmPassword: string()
    .min(8)
    .max(64)
    .required()
    .oneOf([ref('password')], EValidation.PASSWORD_CONFIRMATION)
    .label('Confirm password')
})

export const loginSchema: SchemaOf<IVeeValidateLogin> = object({
  ...emailSchema.fields,
  ...passwordSchema.fields
})

export const registerSchema: SchemaOf<IVeeValidateRegister> = object({
  ...emailSchema.fields,
  ...passwordSchema.fields,
  firstName: string().required().label('FirstName')
})

export const twoFactorAuthSchema: SchemaOf<IVeeValidateTwoFactorAuth> = object({
  code: string()
    .required()
    .min(6, 'Must be exactly 6 digits')
    .max(6, 'Must be exactly 6 digits')
    .label('Code')
})

export const recoverSchema: SchemaOf<IVeeValidateRecover> = object({
  ...emailSchema.fields
})

export const resetSchema: SchemaOf<IVeeValidateReset> = object({
  ...passwordSchema.fields,
  ...confirmPasswordSchema.fields
})
