'use client'

import MyButton from '@/components/MyButton'
import MyFieldInput from '@/components/MyFieldInput'
import { LoginFormType } from '@/types/FormTypes'
import { Form, Formik, FormikHelpers } from 'formik'
import Link from 'next/link'
import { observer } from 'mobx-react-lite'
import { useMobileDetect } from '@/hooks/useMobileDetect'
import { useTheme } from '@/hooks/useTheme'
import { useStores } from '@/hooks/useStores'
import { FIELD_CONFIG } from '@/config/LOGIN_FIELD'
import { loginValidationSchema } from '@/schemas/LoginValidationSchema'
import clsx from 'clsx'

const Login = () => {
    const { userStore } = useStores()
    const isDarkMode = useTheme()
    const isMobile = useMobileDetect()
    const initialValues: LoginFormType = {
        email: '',
        password: '',
    }

    const handleSubmit = async (values: LoginFormType, { setSubmitting }: FormikHelpers<LoginFormType>) => {
        await userStore.login(values.email, values.password)
        setSubmitting(false)
    }

    return (
        <main
            className={clsx('min-h-[79vh] flex items-center p-2 justify-center',
                {
                    'bg-[rgb(38,38,38)]': isDarkMode,
                    'bg-[rgb(237,237,243)]': !isDarkMode
                }
            )}>
            <Formik initialValues={initialValues} validationSchema={loginValidationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting, errors, touched }) => (
                    <Form
                        className={clsx('w-full max-w-md rounded-2xl overflow-hidden',
                            {
                                'bg-[rgb(6,8,15)]': isDarkMode,
                                'bg-white': !isDarkMode
                            }
                        )}>
                        <div className="p-8">
                            <h1
                                className={clsx('text-center mb-8 text-3xl font-bold',
                                    {
                                        'text-white': isDarkMode,
                                        'text-gray-800': !isDarkMode
                                    }
                                )}>
                                Вход в аккаунт
                            </h1>

                            {FIELD_CONFIG.map((field) => (
                                <MyFieldInput
                                    key={field.name}
                                    value={field.name}
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    isTouched={touched[field.name]}
                                    error={errors[field.name]}
                                    isMobile={isMobile}
                                />
                            ))}

                            <MyButton isDarkMode={isDarkMode} isSubmitting={isSubmitting}>
                                Войти
                            </MyButton>
                        </div>

                        <div className="mb-6 text-center">
                            <p className="text-gray-600 text-sm">
                                Нет аккаунта?{' '}
                                <Link
                                    href="/register"
                                    className={clsx('font-medium',
                                        {
                                            'text-white hover:text-gray-400': isDarkMode,
                                            'text-indigo-600 hover:text-indigo-500': !isDarkMode
                                        }
                                    )}>
                                    Зарегистрироваться
                                </Link>
                            </p>
                        </div>
                    </Form>
                )}
            </Formik>
        </main>
    )
}

export default observer(Login)
