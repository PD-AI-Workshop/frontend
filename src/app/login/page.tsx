"use client"

import MyButton from "@/components/MyButton"
import MyFieldInput from "@/components/MyFieldInput"
import { validationSchema } from "@/schemas/LoginValidationSchema"
import { LoginFormType } from "@/types/LoginFormType"
import { Form, Formik, FormikHelpers } from "formik"
import Link from "next/link"
import { useContext } from "react"
import { Context } from "../StoresProvider"
import { StoresType } from "@/types/StoresType"

const Login = () => {
    const { userStore } = useContext(Context) as StoresType

    const initialValues: LoginFormType = {
        email: '',
        password: ''
    }

    const handleSubmit = async (values: LoginFormType, actions: FormikHelpers<LoginFormType>) => {
        const { email, password } = values

        await userStore.login(email, password)

        actions.setSubmitting(false)
    }

    return (
        <main className='min-h-[79vh] flex items-center justify-center bg-[rgb(237,237,243)]'>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {
                    ({ isSubmitting, errors, touched }) => (
                        <Form className="w-full max-w-md bg-white rounded-2xl overflow-hidden">
                            <div className="p-8">
                                <h1 className="text-center mb-8 text-3xl font-bold text-gray-800">Вход в аккаунт</h1>

                                <MyFieldInput
                                    value="email"
                                    type="text"
                                    placeholder="Введите почту"
                                    isTouched={touched.email}
                                    error={errors.email}
                                    isSmall={false}
                                />

                                <MyFieldInput
                                    value="password"
                                    type="password"
                                    placeholder="Введите пароль"
                                    isTouched={touched.password}
                                    error={errors.password}
                                    isSmall={false}
                                />

                                <MyButton
                                    isSubmitting={isSubmitting}
                                    text="Войти"
                                />
                            </div>

                            <div className="mb-6 text-center">
                                <p className="text-gray-600 text-sm">
                                    Нет аккаунта?{' '}
                                    <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">Зарегистрироваться</Link>
                                </p>
                            </div>
                        </Form>
                    )
                }
            </Formik>
        </main>
    )
}

export default Login