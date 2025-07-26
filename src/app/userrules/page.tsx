'use client'

import { useContext } from "react"
import { Context } from "../StoresProvider"
import { StoresType } from "@/types/StoresType"
import { observer } from "mobx-react-lite"

const UserRulesPage = () => {
    const { themeStore } = useContext(Context) as StoresType
    const isDarkMode = themeStore.isDarkMode

    return (
        <main className={`min-h-[79vh] flex items-center justify-center py-10 px-4 ${isDarkMode ? 'bg-[rgb(38,38,38)]' : 'bg-[rgb(237,237,243)]'}`}>
            <div className={`w-full h-full max-w-4xl rounded-xl shadow-lg overflow-hidden ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
                <div className={`${isDarkMode ? 'bg-gradient-to-r from-gray-600 to-gray-700' : 'bg-gradient-to-r from-blue-600 to-indigo-700'} p-6 text-white`}>
                    <h1 className="text-3xl md:text-4xl font-bold text-center">
                        Правила пользования платформой
                    </h1>
                    <p className="text-center mt-2 opacity-90">
                        Последнее обновление: 25 июля 2025 года
                    </p>
                </div>

                <div className="p-6 md:p-8 space-y-6 max-h-full">
                    <section>
                        <h2 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>1. Общие положения</h2>
                        <p className={`mb-4 ${isDarkMode ? 'text-white' : 'text-gray-600'}`}>
                            Настоящие правила регулируют использование платформы для публикации и чтения статей.
                            Регистрируясь на сайте, вы подтверждаете свое согласие с этими правилами.
                        </p>
                    </section>

                    <section>
                        <h2 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>2. Регистрация и учетная запись</h2>
                        <ul className={`list-disc pl-5 space-y-2 ${isDarkMode ? 'text-white' : 'text-gray-600'}`}>
                            <li>Для публикации статей обязательна регистрация</li>
                            <li>Запрещено создавать несколько аккаунтов</li>
                            <li>Вы несете ответственность за безопасность своих учетных данных</li>
                            <li>Администрация вправе блокировать аккаунты за нарушения</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>3. Публикация статей</h2>
                        <div className={`space-y-3 ${isDarkMode ? 'text-white' : 'text-gray-600'}`}>
                            <p>
                                <span className="font-medium">Требования к контенту:</span> Статьи должны быть уникальными,
                                содержательными и соответствовать тематике платформы.
                            </p>
                            <p>
                                <span className="font-medium">Запрещено:</span>
                            </p>
                            <ul className="list-disc pl-5">
                                <li>Публиковать плагиат или украденный контент</li>
                                <li>Размещать рекламу без согласования</li>
                                <li>Использовать ненормативную лексику</li>
                                <li>Распространять ложную информацию</li>
                                <li>Нарушать авторские права</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>4. Авторские права</h2>
                        <div className={`space-y-3 ${isDarkMode ? 'text-white' : 'text-gray-600'}`}>
                            <p>
                                Публикуя статью, вы подтверждаете, что являетесь автором или обладаете правами на публикацию.
                            </p>
                            <p>
                                Администрация оставляет за собой право использовать опубликованные материалы
                                для продвижения платформы с указанием авторства.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>5. Ответственность</h2>
                        <ul className={`list-disc pl-5 space-y-2 ${isDarkMode ? 'text-white' : 'text-gray-600'}`}>
                            <li>Автор несет полную ответственность за содержание статей</li>
                            <li>Платформа не отвечает за точность опубликованной информации</li>
                            <li>За нарушения возможна блокировка аккаунта без возврата средств</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>6. Заключительные положения</h2>
                        <p className={isDarkMode ? 'text-white' : 'text-gray-600'}>
                            Администрация оставляет за собой право изменять данные правила без предварительного уведомления.
                            Регулярно проверяйте эту страницу для ознакомления с актуальными условиями.
                        </p>
                    </section>

                    <div className="pt-4 border-t border-gray-200">
                        <p className="text-center text-gray-500 italic">
                            Используя платформу, вы подтверждаете что ознакомились и согласны с настоящими правилами
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default observer(UserRulesPage)