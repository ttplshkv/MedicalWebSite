// import {updateUserListOnPage} from "../../list/list_script.js";

async function getAddressByRole(role) {
    if (!role || typeof role !== "string") {
        console.log('Роль установлена:', role);
        throw new Error("Invalid role: role must be a non-empty string.");
    }

    let address = null;
    if (role === "children") {
        address = `${role}`;
    } else {
        address = `${role}s`;
    }

    return address;
}

async function createUser(userData, role) {
    let serverUrl = `http://localhost:8081/api/`;
    let addressByRole = await getAddressByRole(role);
    let address = `${serverUrl}${addressByRole}`;
    // let updatePage;

    try {
        // Форматируем дату рождения перед отправкой (если необходимо)
        const formattedBirthDate = userData.birthDate.split('.').join('-');
        userData.birthDate = formattedBirthDate;

        // Делаем POST-запрос с данными
        const response = await fetch(address, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Указываем, что отправляем данные в формате JSON
            },
            body: JSON.stringify(userData), // Отправляем данные в теле запроса
        });

        // Логируем статус ответа для проверки
        console.log('Response Status:', response.status);

        if (!response.ok) {
            // Если сервер вернул ошибку, выбрасываем исключение с подробным сообщением
            const errorData = await response.json();
            throw new Error(`Ошибка: ${response.status} - ${errorData.message || 'Неизвестная ошибка'}`);
        }

        // Если запрос успешен, получаем данные от сервера
        const data = await response.json();
        console.log('Ответ сервера:', data);

        alert('Пользователь успешно создан!');

        window.location.href = `/frontend/entrance/list/list_${role}/list_${role}_index.html`;


    } catch (error) {

        console.error('Ошибка при создании пользователя:', error);
        alert(`Произошла ошибка при создании пользователя: ${error.message}`);
    }
}

// Обработчик отправки формы
document.addEventListener('DOMContentLoaded', function () {
        addEventListener('submit', function (event) {

            event.preventDefault(); // Предотвращаем отправку формы по умолчанию



            const userData = {
            name: document.getElementById('name').value,
            lastname: document.getElementById('lastname').value,
            secondname: document.getElementById('secondname').value,
            birthDate: document.getElementById('birthDate').value, // Дата в формате yyyy-mm-dd
            };

            if (role) {
                    createUser(userData, role); // Создаем пользователя
                } else {
                console.error("Роль не указана в параметрах URL или указана неверно");
                alert("Роль не указана в параметрах URL или указана неверно");
            }

    });
});
