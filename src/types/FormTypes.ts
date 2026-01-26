import { loginValidationSchema } from '@/schemas/LoginValidationSchema'
import { registerValidationSchema } from '@/schemas/RegisterValidationSchema'
import * as Yup from 'yup'

export type LoginFormType = Yup.InferType<typeof loginValidationSchema>

export type RegisterFormType = Yup.InferType<typeof registerValidationSchema>
