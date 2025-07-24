import Section from "@/components/Section"

const PrivacyPolicyPage = () => {
    return (
        <main className="min-h-[79vh] bg-[rgb(237,237,243)] py-12">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-10">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                    Политика конфиденциальности
                </h1>
                <p className="text-gray-600 mb-8">
                    Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
                </p>

                <div className="space-y-8">
                    <Section title="1. Введение">
                        <p>
                            Наш сервис предоставляет платформу для создания и публикации статей.
                            Мы ценим ваше доверие и обязуемся защищать вашу личную информацию.
                            Эта политика объясняет, какие данные мы собираем и как их используем.
                        </p>
                    </Section>

                    <Section title="2. Собираемая информация">
                        <ul className="list-disc pl-6 space-y-2">
                            <li>
                                <span className="font-medium">Данные аккаунта:</span> Имя, email,
                                профильная фотография при регистрации
                            </li>
                            <li>
                                <span className="font-medium">Контент:</span> Статьи, комментарии,
                                черновики и другие материалы, которые вы создаете
                            </li>
                            <li>
                                <span className="font-medium">Техническая информация:</span> IP-адрес,
                                тип браузера, данные об устройстве
                            </li>
                            <li>
                                <span className="font-medium">Аналитика:</span> Статистика просмотров
                                статей, взаимодействия с контентом
                            </li>
                        </ul>
                    </Section>

                    <Section title="3. Использование данных">
                        <p>Мы используем вашу информацию для:</p>
                        <ul className="list-disc pl-6 space-y-2 mt-2">
                            <li>Предоставления и улучшения наших сервисов</li>
                            <li>Персонализации вашего опыта</li>
                            <li>Анализа использования платформы</li>
                            <li>Коммуникации с пользователями</li>
                            <li>Защиты от злоупотреблений и мошенничества</li>
                        </ul>
                    </Section>

                    <Section title="4. Защита данных">
                        <p>
                            Мы применяем современные меры безопасности включая шифрование,
                            двухфакторную аутентификацию и регулярные аудиты безопасности.
                            Ваши статьи и личные данные защищены от несанкционированного доступа.
                        </p>
                    </Section>

                    <Section title="5. Ваши права">
                        <p>Вы имеете право:</p>
                        <ul className="list-disc pl-6 space-y-2 mt-2">
                            <li>Запросить доступ к вашим данным</li>
                            <li>Исправить неточности в информации</li>
                            <li>Удалить ваш аккаунт и данные</li>
                            <li>Ограничить обработку персональных данных</li>
                            <li>Отозвать согласие на обработку</li>
                        </ul>
                    </Section>

                    <Section title="6. Контакты">
                        <p>
                            По вопросам конфиденциальности обращайтесь:
                        </p>
                        <div className="mt-3 space-y-1">
                            <p className="font-medium">Email:</p>
                            <p className="text-blue-600">privacy@articleplatform.com</p>
                            <p className="font-medium mt-2">Почтовый адрес:</p>
                            <p>ул. Защиты Данных, 123, Москва, Россия, 123456</p>
                        </div>
                    </Section>

                    <div className="pt-4 border-t border-gray-200">
                        <p className="text-gray-600 italic">
                            Эта политика может периодически обновляться. Мы уведомим вас о значительных
                            изменениях через email или уведомление в сервисе.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default PrivacyPolicyPage