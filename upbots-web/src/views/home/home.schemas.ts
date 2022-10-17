import { object, string } from 'yup'

export const couponSchema = object({
  couponCode: string().required().label('Coupon code')
})
