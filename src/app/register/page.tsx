'use client'

import { validationSchema } from '@/schemas/RegisterValidationSchema'
import { RegisterFormType } from '@/types/RegisterFormType'
import { Form, Formik, FormikHelpers } from 'formik'
import Link from 'next/link'
import { useState } from 'react'
import { NotificationType } from '@/types/NotificationType'
import { observer } from 'mobx-react-lite'
import { useMobileDetect } from '@/hooks/useMobileDetect'
import { useStores } from '@/hooks/useStores'
import { useTheme } from '@/hooks/useTheme'
import dynamic from 'next/dynamic'
import { FIELD_CONFIG } from '@/config/REGISTER_FIELD'

const MyButton = dynamic(() => import('@/components/MyButton'))
const MyFieldInput = dynamic(() => import('@/components/MyFieldInput'))
const Notification = dynamic(() => import('@/components/Notification'))

const Register = () => {
    const { userStore } = useStores()
    const [notification, setNotification] = useState<NotificationType | null>(null)
    const isMobile = useMobileDetect()
    const isDarkMode = useTheme()

    const initialValues: RegisterFormType = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    const handleSubmit = async (values: RegisterFormType, { setSubmitting }: FormikHelpers<RegisterFormType>) => {
        try {
            const { username, email, password } = values

            await userStore.registration(username, email, password, 'user')
            setNotification({
                message: 'Регистрация прошла успешно!',
                type: 'success',
            })
        } catch (error: any) {
            setNotification({
                message: `Error: ${error.message || 'Ошибка при регистрации'}`,
                type: 'error',
            })
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <main
            className={`min-h-[79vh] flex justify-center items-center p-5 ${isDarkMode ? 'bg-[rgb(38,38,38)]' : 'bg-[rgb(237,237,243)]'}`}
        >
            {notification && (
                <Notification notificationType={notification.type} notificationMessage={notification.message} />
            )}

            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting, errors, touched }) => (
                    <Form
                        className={`w-auto p-8 max-w-auto rounded-2xl overflow-hidden ${isDarkMode ? 'bg-black' : 'bg-white'}`}
                    >
                        <h1
                            className={`text-center mb-4 mt-4 text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
                        >
                            Регистрация
                        </h1>
                        <h1 className="text-center mb-4 text-gray-400 text-base">
                            Создай бесплатный аккаунт — будь в курсе новых технологий
                        </h1>

                        <div className="justify-center gap-5 md:flex">
                            {FIELD_CONFIG.filter((obj) => obj.isSmall).map((field) => (
                                <MyFieldInput
                                    key={field.name}
                                    value={field.name}
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    isTouched={touched[field.name]}
                                    error={errors[field.name]}
                                    isMobile={isMobile}
                                    isSmall
                                />
                            ))}
                        </div>

                        {FIELD_CONFIG.filter((obj) => !obj.isSmall).map((field) => (
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
                            Создать аккаунт
                        </MyButton>
                        <p className="text-center mt-4 text-gray-400 text-xs">
                            Нажимая на кнопку, вы соглашаетесь с
                            <Link className="text-[rgb(141,146,252)] underline" href={'/userrules'}>
                                Правилами Использования
                            </Link>
                            и нашей
                            <Link className="text-[rgb(141,146,252)] underline" href={'/privacypolicy'}>
                                Политикой <br /> Конфиденциальности
                            </Link>
                        </p>
                    </Form>
                )}
            </Formik>
        </main>
    )
}

export default observer(Register)
