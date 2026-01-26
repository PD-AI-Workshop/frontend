import * as Yup from 'yup'

export const registerValidationSchema = Yup.object({
    username: Yup.string().required('Обязательное поле'),
    email: Yup.string().email('Некорректный email').required('Обязательное поле'),
    password: Yup.string().min(4, 'Пароль должен быть не менее 4 символов').required('Обязательное поле'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
        .required('Подтвердите пароль'),
})
