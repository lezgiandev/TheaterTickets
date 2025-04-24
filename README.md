# 🎭 Teatroo - Театральная Билетная Система

<div align="center">
  <img src="https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D" alt="Vue.js"/>
  <img src="https://img.shields.io/badge/Pinia-FFD700?style=for-the-badge&logo=pinia&logoColor=white" alt="Pinia"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white" alt="Django"/>
</div>

## 📝 Описание проекта

Teatroo - это современная система продажи театральных билетов, разработанная с использованием Vue.js 3, Pinia, Tailwind CSS и Django REST Framework. Проект предоставляет удобный интерфейс для просмотра театральных сеансов, бронирования мест и управления бронированиями.

## ✨ Основные возможности

- 🎟️ Просмотр всех доступных театральных сеансов
- 🔍 Расширенный поиск и фильтрация сеансов
- 🎭 Детальная информация о каждом сеансе
- 💺 Интерактивная система выбора мест
- 📅 Управление бронированиями
- 👤 Система аутентификации пользователей
- 🎨 Современный и отзывчивый дизайн

## 🛠️ Технологический стек

### Frontend
- **Vue.js 3** - Прогрессивный JavaScript фреймворк
- **Pinia** - Управление состоянием приложения
- **Tailwind CSS** - Утилитарный CSS фреймворк
- **Vue Router** - Маршрутизация
- **TypeScript** - Типизированный JavaScript
- **Axios** - HTTP клиент

### Backend
- **Django** - Python веб-фреймворк
- **Django REST Framework** - REST API
- **Django Filters** - Фильтрация данных
- **JWT Authentication** - Аутентификация

## 📁 Структура проекта

```
Teatroo/
├── client/                 # Frontend приложение
│   ├── src/
│   │   ├── assets/        # Статические ресурсы
│   │   ├── components/    # Vue компоненты
│   │   ├── stores/        # Pinia хранилища
│   │   ├── views/         # Страницы приложения
│   │   └── router/        # Маршрутизация
│   └── package.json       # Зависимости frontend
│
└── server/                # Backend приложение
    ├── theatre/           # Основное приложение
    │   ├── models.py      # Модели данных
    │   ├── views.py       # API endpoints
    │   ├── serializers.py # Сериализаторы
    │   └── urls.py        # URL маршруты
    └── requirements.txt   # Python зависимости
```

## 🚀 Установка и запуск

### Backend

1. Создайте виртуальное окружение:
```bash
cd server
python -m venv .venv
source .venv/bin/activate  # Linux/Mac
.venv\Scripts\activate     # Windows
```

2. Установите зависимости:
```bash
pip install -r requirements.txt
```

3. Примените миграции:
```bash
python manage.py migrate
```

4. Запустите сервер:
```bash
python manage.py runserver
```

### Frontend

1. Установите зависимости:
```bash
cd client
npm install
```

2. Запустите development сервер:
```bash
npm run dev
```

## 📱 Основные страницы приложения

- **Главная** - Обзор всех сеансов
- **Детали сеанса** - Подробная информация о сеансе
- **Бронирование** - Выбор мест и оформление брони
- **Мои бронирования** - История и управление бронированиями
- **Авторизация** - Вход и регистрация

## 🎨 Особенности дизайна

- Современный минималистичный интерфейс
- Адаптивный дизайн для всех устройств
- Плавные анимации и переходы
- Темная тема с акцентными цветами
- Интуитивно понятная навигация

## 🔒 Безопасность

- JWT аутентификация
- Защита от CSRF атак
- Валидация данных на клиенте и сервере
- Безопасное хранение паролей

## 📄 Лицензия

MIT License
