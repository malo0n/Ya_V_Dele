# pay_us_money
Для работы серверной части приложения нужно сначала установить виртуальное окружение:
    python -m venv venv
Активировать виртуальное окружение:
    venv/scripts/activate
Установить все библиотеки:
    pip install -r requirements.txt 
Перейти в папку с проектом:
    cd help_you
Запустить сервер:
    python manage.py runserver

Для запросов к серверу используется API:
    api/register/ - регистрация пользователя
    api/login/ - авторизация и вход в аккаунт (Разрешен только POST запрос)
    api/habits/ - получение списка вредных привычек (Разрешен только GET запрос)
    api/profile/<int:pk> - получение и изменение информации о пользователе по его id (Разрешены методы GET PUT PATCH)