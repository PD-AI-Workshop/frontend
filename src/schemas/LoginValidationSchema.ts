import * as Yup from 'yup'

export const validationSchema = Yup.object({
    email: Yup.string().email('Неверный email').required('Обязательное поле'),
    password: Yup.string().required('Обязательное поле').min(4, 'Пароль должен быть не менее 4 символов')
})