import { object, string, SchemaOf, ref } from 'yup'
import {
  TVeeValidateMainProfile,
  IVeeValidateEditEmail,
  IVeeValidateChangePassword,
  IVeeValidateCreateTwoFactorAuth,
  EValidation
} from '@/types'
import { confirmPasswordSchema, passwordSchema } from '@/views/auth/auth.schemas'

export const mainProfileSchema: SchemaOf<TVeeValidateMainProfile> = object({
  firstname: string().required().label('FirstName'),
  lastname: string().required().label('LastName'),
  username: string().notRequired().label('UserName'),
  country: string().required().label('Country'),
  homeAddress: string().required().label('HomeAddress'),
  phone: string().required().label('Phone'),
  email: string().notRequired().label('Email'),
  telegram: string().notRequired().label('Telegram'),
  password: string().notRequired().label('Password')
})

export const editEmailSchema: SchemaOf<IVeeValidateEditEmail> = object({
  currentEmail: string().email().required().label('CurrentEmail'),
  newEmail: string().email().required().label('NewEmail')
})

export const changePasswordSchema: SchemaOf<IVeeValidateChangePassword> = object({
  password: passwordSchema.fields.password,
  newPassword: passwordSchema.fields.password,
  repeatNewPassword: confirmPasswordSchema.fields.confirmPassword
    .oneOf([ref('newPassword')], EValidation.PASSWORD_CONFIRMATION)
})

export const createTwoFactorAuthSchema: SchemaOf<IVeeValidateCreateTwoFactorAuth> = object({
  code: string()
    .required()
    .min(6, 'Must be exactly 6 digits')
    .max(6, 'Must be exactly 6 digits')
    .label('Code')
})
