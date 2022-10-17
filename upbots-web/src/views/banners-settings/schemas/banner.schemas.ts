import { object, string, mixed, SchemaOf } from 'yup'
import { IBanner } from '../types/banner'

export const CreateBannerSchema: SchemaOf<IBanner> = object({
  _id: string().optional(),
  name: string().required().label('Banner name'),
  href: string().required().label('Banner link'),
  image: mixed().optional()
})
