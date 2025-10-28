document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form'); // Находим форму
    const submitButton = form.querySelector('[type="submit"]'); // Находим кнопку отправки
    const loadingScreen = document.getElementById('loading-screen'); // Экран загрузки

    form.addEventListener('submit', async function (event) {  // Сделаем эту функцию асинхронной
        event.preventDefault(); // Предотвращаем стандартное поведение формы (перезагрузку страницы)

        // Получаем значения логина и пароля
        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;

        // Проверяем, что поля не пустые
        if (login.trim() === '' || password.trim() === '') {
            alert('Пожалуйста, заполните все поля!');
            return;
        }

        // Блокируем кнопку отправки для предотвращения повторных отправок
        submitButton.disabled = true;
        showLoadingScreen(); // Показываем экран загрузки
        form.reset();

        const authData = {login, password};

        try {
            const data = await signIn(authData); // Получаем результат от функции signIn
            // Очищаем поля формы после отправки
            console.log('пользователь:', data.data.role);
            const role = data.data.role;
            const roles = {
                administrator: "admin/admin.html",
                supervisor: "supervisor/supervisor.html",
                curator: "curator/curator_index.html",
                teacher: "teacher/teacher_index.html"
            };
            if (roles[role]) {

                document.body.style.display = 'none';
                // Переход на страницу с небольшой задержкой для улучшения восприятия
                setTimeout(() => {
                    // Используем location.replace() для редиректа без сохранения главной страницы в истории
                    history.pushState({}, '', '');
                    window.location.replace(roles[role]);
                }, 300);  // Задержка 300 мс
            } else {
                alert('Данные успешно отправлены! Логин: ' + login);
            }

        } catch (error) {
            alert('Ошибка при авторизации: ' + error.message);
        } finally {
            // Включаем кнопку обратно и скрываем экран загрузки
            submitButton.disabled = false;
            hideLoadingScreen();
        }
    });
});

function showLoadingScreen() {
    document.getElementById('loading-screen').style.display = 'flex';
}

function hideLoadingScreen() {
    document.getElementById('loading-screen').style.display = 'none';
}

async function signIn(authData) {
    try {
        const response = await fetch('http://localhost:8081/api/auth/sign_in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(authData),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('парсим:', data.data.role);
            document.getElementById('response').innerHTML = `<p>Success: ${JSON.stringify(data)}</p>`;
            return data; // Возвращаем данные
        } else {
            const errorText = await response.text();
            document.getElementById('response').innerHTML = `<p>Error: ${errorText}</p>`;
            throw new Error(errorText); // Генерируем ошибку, если запрос неудачен
        }
    } catch (error) {
        document.getElementById('response').innerHTML = `<p>Error: ${error.message}</p>`;
        throw error;  // Генерируем ошибку для дальнейшей обработки
    }
}
