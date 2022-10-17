import { object, string, mixed, SchemaOf } from 'yup'
import { IVeeValidateCreateKey, IVeeValidateEditKey } from '@/types'

export const createKeySchema: SchemaOf<IVeeValidateCreateKey> = object({
  exchange: string().notRequired().label('Exchange'),
  name: string().required().label('API Key label'),
  publicKey: string().required().label('Public Key'),
  secretKey: string().required().label('Secret Key'),
  subAccountName: mixed().notRequired(),
  password: string().notRequired().label('Passphrase')
})

export const editKeySchema: SchemaOf<IVeeValidateEditKey> = object({
  id: string().notRequired().label('Id'),
  name: string().required().label('API Key label')
})
