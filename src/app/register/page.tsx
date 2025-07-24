"use client"

import MyButton from "@/components/MyButton"
import MyFieldInput from "@/components/MyFieldInput"
import { validationSchema } from "@/schemas/RegisterValidationSchema"
import { RegisterFormType } from "@/types/RegisterFormType"
import { Form, Formik, FormikHelpers } from "formik"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import { Context } from "../StoresProvider"
import { StoresType } from "@/types/StoresType"
import { NotificationType } from "@/types/NotificationType"
import Notification from "@/components/Notification"

const Register = () => {
  const { userStore } = useContext(Context) as StoresType
  const [notification, setNotification] = useState<NotificationType | null>(null)

  const initialValues: RegisterFormType = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  useEffect(() => {
    if (notification) {

      const timer = setTimeout(() => {
        setNotification(null)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [notification])

  const handleSubmit = async (values: RegisterFormType, actions: FormikHelpers<RegisterFormType>) => {
    try {
      const { username, email, password } = values
      const role = 'user'
      const successNotification: NotificationType = {
        message: 'Регистрация прошла успешно!',
        type: 'success'
      }

      await userStore.registration(username, email, password, role)

      setNotification(successNotification)
    } catch (error: any) {
      const errorNotification: NotificationType = {
        message: `Error: ${error.message || 'Ошибка при регистрации'}`,
        type: 'error'
      }

      setNotification(errorNotification)
    } finally {
      actions.setSubmitting(false)
    }
  }

  return (
    <main className="min-h-[79vh] flex justify-center items-center bg-[rgb(237,237,243)]">

      {notification && <Notification
        notificationType={notification.type}
        notificationMessage={notification.message}
      />}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {
          ({ isSubmitting, errors, touched }) => (
            <Form className="w-auto max-w-auto bg-white rounded-2xl overflow-hidden">
              <div className="p-8">
                <h1 className="text-center mb-4 mt-4 text-3xl font-bold text-gray-800">Регистрация</h1>
                <h1 className="text-center mb-4 text-gray-400 text-base">Создай бесплатный аккаунт — будь в курсе новых технологий</h1>

                <div className="flex justify-center gap-5">
                  <MyFieldInput
                    value="username"
                    type="text"
                    placeholder="Ваше имя"
                    isTouched={touched.username}
                    error={errors.username}
                    isSmall={true}
                  />

                  <MyFieldInput
                    value="email"
                    type="text"
                    placeholder="Введите почту"
                    isTouched={touched.email}
                    error={errors.email}
                    isSmall={true}
                  />
                </div>

                <MyFieldInput
                  value="password"
                  type="password"
                  placeholder="Придумайте пароль"
                  isTouched={touched.password}
                  error={errors.password}
                  isSmall={false}
                />

                <MyFieldInput
                  value="confirmPassword"
                  type="password"
                  placeholder="Повторите пароль"
                  isTouched={touched.confirmPassword}
                  error={errors.confirmPassword}
                  isSmall={false}
                />

                <MyButton
                  isSubmitting={isSubmitting}
                  text="Создать аккаунт"
                />

                <p className="text-center mt-4 text-gray-400 text-xs">
                  <span>Нажимая на кнопку, вы соглашаетесь с </span>
                  <Link className="text-[rgb(141,146,252)] underline" href={'/userrules'}>Правилами Использования</Link>
                  <span> и нашей </span>
                  <Link className="text-[rgb(141,146,252)] underline" href={'/privacypolicy'}>Политикой <br /> Конфиденциальности</Link>
                </p>
              </div>
            </Form>
          )
        }
      </Formik>
    </main>
  )
}

export default Register