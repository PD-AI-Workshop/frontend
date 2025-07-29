"use client"

import MyButton from "@/components/MyButton"
import MyFieldInput from "@/components/MyFieldInput"
import { validationSchema } from "@/schemas/LoginValidationSchema"
import { LoginFormType } from "@/types/LoginFormType"
import { Form, Formik, FormikHelpers } from "formik"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import { Context } from "../StoresProvider"
import { StoresType } from "@/types/StoresType"
import { observer } from "mobx-react-lite"

const Login = () => {
    const { userStore, themeStore } = useContext(Context) as StoresType
    const isDarkMode = themeStore.isDarkMode
    const [isMobile, setIsMobile] = useState(false)
    const initialValues: LoginFormType = {
        email: '',
        password: ''
    }

    const handleSubmit = async (values: LoginFormType, actions: FormikHelpers<LoginFormType>) => {
        const { email, password } = values
        await userStore.login(email, password)
        actions.setSubmitting(false)
    }

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.matchMedia("(max-width: 768px)").matches)
        }

        checkIsMobile()
        window.addEventListener("resize", checkIsMobile)
        return () => window.removeEventListener("resize", checkIsMobile)
    }, [])

    return (
        <main className={`min-h-[79vh] flex items-center p-2 justify-center ${isDarkMode ? 'bg-[rgb(38,38,38)]' : 'bg-[rgb(237,237,243)]'}`}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {
                    ({ isSubmitting, errors, touched }) => (
                        <Form className={`w-full max-w-md rounded-2xl overflow-hidden ${isDarkMode ? 'bg-[rgb(6,8,15)]' : 'bg-white'}`}>
                            <div className="p-8">
                                <h1 className={`text-center mb-8 text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Вход в аккаунт</h1>

                                <MyFieldInput
                                    value="email"
                                    type="text"
                                    placeholder="Введите почту"
                                    isTouched={touched.email}
                                    error={errors.email}
                                    isSmall={false}
                                    isMobile={isMobile}
                                />

                                <MyFieldInput
                                    value="password"
                                    type="password"
                                    placeholder="Введите пароль"
                                    isTouched={touched.password}
                                    error={errors.password}
                                    isSmall={false}
                                    isMobile={isMobile}
                                />

                                <MyButton
                                    isDarkMode={isDarkMode}
                                    isSubmitting={isSubmitting}
                                    text="Войти"
                                />
                            </div>

                            <div className="mb-6 text-center">
                                <p className="text-gray-600 text-sm">
                                    Нет аккаунта?{' '}
                                    <Link href="/register" className={`font-medium ${isDarkMode ? 'text-white hover:text-gray-400' : 'text-indigo-600 hover:text-indigo-500'}`}>Зарегистрироваться</Link>
                                </p>
                            </div>
                        </Form>
                    )
                }
            </Formik>
        </main>
    )
}

export default observer(Login)