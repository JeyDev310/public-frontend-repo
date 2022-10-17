import { object, string, SchemaOf } from 'yup'
import { IVeeValidateAddDexWallet } from '@/types'

export const AddDexWalletSchema: SchemaOf<IVeeValidateAddDexWallet> = object({
  label: string().required().label('Label'),
  address: string().required().label('Address')
})
