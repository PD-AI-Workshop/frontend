export const FIELD_CONFIG = [
    {
        name: 'username',
        type: 'text',
        placeholder: 'Ваше имя',
        isSmall: true,
    },
    {
        name: 'email',
        type: 'text',
        placeholder: 'Введите почту',
        isSmall: true,
    },
    {
        name: 'password',
        type: 'password',
        placeholder: 'Придумайте пароль',
        isSmall: false,
    },
    {
        name: 'confirmPassword',
        type: 'password',
        placeholder: 'Повторите пароль',
        isSmall: false,
    },
] as const
