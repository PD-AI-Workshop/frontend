'use client'

import MyButton from '@/components/MyButton'
import MyFieldInput from '@/components/MyFieldInput'
import { validationSchema } from '@/schemas/LoginValidationSchema'
import { LoginFormType } from '@/types/LoginFormType'
import { Form, Formik, FormikHelpers } from 'formik'
import Link from 'next/link'
import { observer } from 'mobx-react-lite'
import { useMobileDetect } from '@/hooks/useMobileDetect'
import { useTheme } from '@/hooks/useTheme'
import { useStores } from '@/hooks/useStores'
import { FIELD_CONFIG } from '@/config/LOGIN_FIELD'

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
            className={`min-h-[79vh] flex items-center p-2 justify-center ${isDarkMode ? 'bg-[rgb(38,38,38)]' : 'bg-[rgb(237,237,243)]'}`}
        >
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting, errors, touched }) => (
                    <Form
                        className={`w-full max-w-md rounded-2xl overflow-hidden ${isDarkMode ? 'bg-[rgb(6,8,15)]' : 'bg-white'}`}
                    >
                        <div className="p-8">
                            <h1
                                className={`text-center mb-8 text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
                            >
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
                                    className={`font-medium ${isDarkMode ? 'text-white hover:text-gray-400' : 'text-indigo-600 hover:text-indigo-500'}`}
                                >
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
