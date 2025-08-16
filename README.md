# AI-Workshop frontend

## Описание проекта

### Используемые технологии:

<img src="https://github.com/user-attachments/assets/0609feae-90f2-4ec6-9a8f-72541a88ce32" alt="typescript" width="75" height="75" />
<img src="https://github.com/user-attachments/assets/1e5a5545-738b-499a-be32-6c7a6f4b6ead" alt="react" width="75" height="75" />
<img src="https://github.com/user-attachments/assets/5db2ff93-a058-40a0-a464-26d265e502f3" alt="nextjs" width="75" height="75" />
<img src="https://github.com/user-attachments/assets/3dd21106-e20b-4d0c-b7ab-4a0d018924eb" alt="pnpm" width="75" height="75" />
<img src="https://github.com/user-attachments/assets/48d70a4f-c4e2-49d6-8638-a9642a697d95" alt="tailwind" width="75" height="75" />
<img src="https://github.com/user-attachments/assets/7421ffac-2634-43d4-9463-fc028d8ce689" alt="antd" width="75" height="75" />
<img src="https://github.com/user-attachments/assets/d24ddbc5-3e27-4ec2-9d18-f5e5a7261e0a" alt="axios" width="75" height="75" />
<img src="https://github.com/user-attachments/assets/a4fa6310-8f72-4771-ab2b-32416fb33800" alt="mobx" width="75" height="75" />
<img src="https://github.com/user-attachments/assets/5dccd5cd-e6ea-45d8-898c-51b9dc5ea750" alt="prettier" width="75" height="75" />
<img src="https://github.com/user-attachments/assets/147d64ed-f086-4f52-bd13-39bd96e141d5" alt="formik" width="75" height="75" />
<img src="https://github.com/user-attachments/assets/11be0c8f-65a7-4d6a-ad88-d0ff721614d0" alt="framermotion" width="75" height="75" />
<img src="https://github.com/user-attachments/assets/5af1ed2c-7f6e-43b1-b33a-b0b1bb8e59a9" alt="tinymce" width="75" height="75" />
<img src="https://github.com/user-attachments/assets/59b09fca-f33f-4f62-b07f-d3bd9615a7e8" alt="lucide" width="75" height="75" />
<img src="https://github.com/user-attachments/assets/0d7696a1-baf4-4a62-8e5a-b447e8264ae7" alt="docker" width="75" height="75" />

<br/>

### Основные функции:
- Редактор контента с TinyMCE
- Анимации интерфейса через Framer Motion
- Подсветка кода с помощью PrismJS
- Асинхронный HTTP клиент на Axios

### Предварительные требования
- Node.js v22.14.0 или выше
- Pnpm v10.6.5 или выше
- Docker v27.5.1 (для docker-запуска)

## Установка и запуск (без Docker)

1. Клонируйте репозиторий:
```
git clone <repository-url>
cd frontend
```
2. Установите зависимости:
```
pnpm install
```
3. Создайте файл .env в корне проекта и заполните значение:
```
# Пример URL для отправки backend (замените значение на свое!)
NEXT_PUBLIC_API_BASE_URL=/api
```
4. Запустите сервер разработки:
```
pnpm run dev
```
5. Откройте в браузере:
```
http://localhost:3000
```

## Сборка для production
1. Создайте файл .env в корне проекта и заполните значения:
```
# Пример URL для отправки запросов (замените значение на свое!)
NEXT_PUBLIC_API_BASE_URL=/api
```
2. Соберите проект:
```
pnpm run build
```
3. Запустите production-сервер:
```
pnpm run start
```

## Запуск с помощью Docker
1. Клонируйте репозиторий:
```
git clone <repository-url>
cd frontend
```
2. Создайте файл .env в корне проекта и заполните значение:
```
# Пример URL для отправки backend (замените значение на свое!)
NEXT_PUBLIC_API_BASE_URL=/api
```
3. Сборка Docker образа
```
docker build -t aiworkshop-frontend .
```
4. Запуск контейнера
```
docker run -p 3000:3000 aiworkshop-frontend
```
Приложение будет доступно по адресу: http://localhost:3000

## Основные скрипты

- ```pnpm run dev``` - запуск dev-сервера
- ```pnpm run build``` - сборка production-версии (очищает кэш)
- ```pnpm run start``` - запуск production-сборки
- ```pnpm run prettify``` - форматирование кода с Prettier

## Структура проекта
```
frontend/
├── Dockerfile              # Конфигурация для сборки Docker-образа приложения
├── README.md               # Основная документация проекта
├── next-env.d.ts           # Автоматически генерируемые типы Next.js
├── next.config.js          # Конфигурация Next.js
├── package.json            # Метаданные проекта, зависимости и скрипты
├── pnpm-lock.yaml          # Файл блокировки версий для pnpm
├── postcss.config.mjs      # Конфигурация PostCSS (обработка CSS)
├── public                  # Статические ресурсы (изображения, шрифты, favicon и т.д.)
├── src                     # Основной исходный код приложения
│   ├── app                 # Роутинг приложения
│   ├── components          # UI компоненты
│   ├── config              # Конфигурация полей форм для логина и регистрации
│   ├── constants           # Константы
│   ├── hooks               # Кастомные хуки
│   ├── http                # HTTP клиент
│   ├── props               # Пропсы для компонентов
│   ├── schemas             # Схемы валидации
│   ├── store               # Состояния (MobX)
│   ├── types               # Типы TypeScript
│   └── utils               # Вспомогательные утилиты
├── tailwind.config.ts      # Конфигурация Tailwind CSS (темы, цвета, шрифты)
└── tsconfig.json           # Конфигурация TypeScript
```
