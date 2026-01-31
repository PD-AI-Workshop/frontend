'use client'

import { observer } from 'mobx-react-lite'
import { useTheme } from '@/hooks/useTheme'
import clsx from 'clsx'

const UserRulesPage = () => {
    const isDarkMode = useTheme()

    return (
        <main
            className={clsx('min-h-[79vh] flex items-center justify-center py-10 px-4',
                {
                    'bg-[rgb(38,38,38)]': isDarkMode,
                    'bg-[rgb(237,237,243)]': !isDarkMode
                }
            )}>
            <div
                className={clsx('w-full h-full max-w-4xl rounded-xl shadow-lg overflow-hidden',
                    {
                        'bg-black': isDarkMode,
                        'bg-white': !isDarkMode
                    }
                )}>
                <div
                    className={clsx('p-6 text-white',
                        {
                            'bg-gradient-to-r from-gray-600 to-gray-700': isDarkMode,
                            'bg-gradient-to-r from-blue-600 to-indigo-700': !isDarkMode
                        }
                    )}>
                    <h1 className="text-3xl md:text-4xl font-bold text-center">Правила пользования платформой</h1>
                    <p className="text-center mt-2 opacity-90">Последнее обновление: 25 июля 2025 года</p>
                </div>

                <div className="p-6 md:p-8 space-y-6 max-h-full">
                    <section>
                        <h2 className={clsx('text-xl font-semibold mb-3',
                            {
                                'text-white': isDarkMode,
                                'text-gray-800': !isDarkMode
                            }
                        )}>
                            1. Общие положения
                        </h2>
                        <p className={clsx('mb-4',
                            {
                                'text-white': isDarkMode,
                                'text-gray-600': !isDarkMode
                            }
                        )}>
                            Настоящие правила регулируют использование платформы для публикации и чтения статей.
                            Регистрируясь на сайте, вы подтверждаете свое согласие с этими правилами.
                        </p>
                    </section>

                    <section>
                        <h2 className={clsx('text-xl font-semibold mb-3',
                            {
                                'text-white': isDarkMode,
                                'text-gray-800': !isDarkMode
                            }
                        )}>
                            2. Регистрация и учетная запись
                        </h2>
                        <ul className={clsx('list-disc pl-5 space-y-2',
                            {
                                'text-white': isDarkMode,
                                'text-gray-600': !isDarkMode
                            }
                        )}>
                            <li>Для публикации статей обязательна регистрация</li>
                            <li>Запрещено создавать несколько аккаунтов</li>
                            <li>Вы несете ответственность за безопасность своих учетных данных</li>
                            <li>Администрация вправе блокировать аккаунты за нарушения</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className={clsx('text-xl font-semibold mb-3',
                            {
                                'text-white': isDarkMode,
                                'text-gray-800': !isDarkMode
                            }
                        )}>
                            3. Публикация статей
                        </h2>
                        <div className={clsx('space-y-3',
                            {
                                'text-white': isDarkMode,
                                'text-gray-600': !isDarkMode
                            }
                        )}>
                            <p>
                                <span className="font-medium">Требования к контенту:</span> Статьи должны быть
                                уникальными, содержательными и соответствовать тематике платформы.
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
                        <h2 className={clsx('text-xl font-semibold mb-3',
                            {
                                'text-white': isDarkMode,
                                'text-gray-800': !isDarkMode
                            }
                        )}>
                            4. Авторские права
                        </h2>
                        <div className={clsx('space-y-3',
                            {
                                'text-white': isDarkMode,
                                'text-gray-600': !isDarkMode
                            }
                        )}>
                            <p>
                                Публикуя статью, вы подтверждаете, что являетесь автором или обладаете правами на
                                публикацию.
                            </p>
                            <p>
                                Администрация оставляет за собой право использовать опубликованные материалы для
                                продвижения платформы с указанием авторства.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className={clsx('text-xl font-semibold mb-3',
                            {
                                'text-white': isDarkMode,
                                'text-gray-800': !isDarkMode
                            }
                        )}>
                            5. Ответственность
                        </h2>
                        <ul className={clsx('list-disc pl-5 space-y-2',
                            {
                                'text-white': isDarkMode,
                                'text-gray-600': !isDarkMode
                            }
                        )}>
                            <li>Автор несет полную ответственность за содержание статей</li>
                            <li>Платформа не отвечает за точность опубликованной информации</li>
                            <li>За нарушения возможна блокировка аккаунта без возврата средств</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className={clsx('text-xl font-semibold mb-3',
                            {
                                'text-white': isDarkMode,
                                'text-gray-800': !isDarkMode
                            }
                        )}>
                            6. Заключительные положения
                        </h2>
                        <p className={clsx(
                            {
                                'text-white': isDarkMode,
                                'text-gray-600': !isDarkMode
                            }
                        )}>
                            Администрация оставляет за собой право изменять данные правила без предварительного
                            уведомления. Регулярно проверяйте эту страницу для ознакомления с актуальными условиями.
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
