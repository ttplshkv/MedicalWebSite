# MedicalWebSite — Frontend

Этот каталог содержит фронтенд-часть проекта MedicalWebSite — коммерческий проект с ролевым доступом (админ, куратор, преподаватель, ребёнок) и набором экранов для входа, списков и создания сущностей.

## Назначение проекта
- **Демонстрация навыков верстки и ванильного JavaScript**: работа с DOM, модулями, простыми запросами на бэкенд/локальные скрипты.
- **Структурирование интерфейса по ролям**: отдельные экраны и стили для администратора, куратора, преподавателя и детей.
- **Базовые CRUD‑сценарии**: страницы списков и создания сущностей (куратор/преподаватель/надзиратель/дети и т.д.).

## Используемые технологии
- **HTML5** — разметка страниц, семантические теги.
- **CSS3** — адаптивные стили, отдельные CSS для разных экранов.
- **Vanilla JavaScript (ES6+)** — логика взаимодействия с DOM и навигацией.
- **Fetch API/модульная структура** — для обращений к вспомогательным скриптам в каталоге `userRequests`.
- **npm (package.json)** — базовое описание проекта; при необходимости можно запускать локальный сервер через утилиты из npm.

## Структура каталогов
```
frontend/
  entrance/                 # Экраны входа и интерфейсы по ролям
    admin/
      admin.html
      admin_style.css
      admin_script.js
      creation/
        curator/create_curator.html
        supervisor/create_supervisor.html
        teacher/create_teacher.html
        children/create_children.html
    curator/
      curator_index.html
      curator_style.css
    children/
      children.html
      children_style.css
    teacher/
      teacher_index.html
      teacher_style.css
    supervisor/
      supervisor.html
      supervisor_style.css
    list/                   # Списки сущностей
      list_script.js
      list_style.css
      list_children/list_children_index.html
      list_curator/list_curator_index.html
      list_teacher/list_teacher_index.html
      list_supervisor/list_supervisor_index.html
  index.js                  # Точка входа JS (инициализация/навигация)
  package.json              # Мета‑информация npm
  resourses/                # Статичные ресурсы (изображения и т.п.)
    images/label/
  userRequests/             # JS‑утилиты для create/read/update/delete запросов
    create_script.js
    get_script.js
    update_script.js
    delete_script.js
```

## Ключевые экраны и роли
- **Admin**: навигация и страницы для создания сущностей (куратор/преподаватель/надзиратель/дети), отдельные стили и скрипты.
- **Curator/Teacher/Supervisor/Children**: собственные индекс‑страницы со стилями; доступ к спискам и операциям по роли.
- **List‑страницы**: отображение коллекций, базовые действия (просмотр, переход к созданию).

## Как запустить локально
Проект статический и может быть открыт напрямую из файловой системы, но удобнее поднять простой статический сервер:

Через `serve`:
```bash
cd frontend
npm i -g serve
serve -l 5173 .
```
Откройте в браузере: `http://localhost:5173/entrance/admin/admin.html` (или нужную страницу по роли).


