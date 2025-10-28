import {parseRoleFromSingularToPlural} from "../entrance/list/list_script.js";

export async function getUsers(role) {
    let serverUrl = `http://localhost:8081/api/`;
    let addressByRole = parseRoleFromSingularToPlural(role);
    let address = `${serverUrl}${addressByRole}`;

    console.log(address);

    try {
        const response = await fetch(address, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Ошибка при загрузке данных: ${response.status}`);
        }

        const data = await response.json();
        const users = data.data;
        if (!Array.isArray(users)) {
            throw new Error("Полученные данные не являются массивом");
        }

        console.log("Полученные данные:", users);
        return users;
    } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
        alert("Произошла ошибка при загрузке данных.");
        return [];
    }
}

export async function getRelatedUserListByRoleAndUserId(relatedRole, userId) {
    const serverUrl = `http://localhost:8081/api/curators/${userId}/`+ parseRoleFromSingularToPlural(relatedRole); // Пример API для получения списка педагогов

    console.log('адрес:', serverUrl);
    try {
        const response = await fetch(serverUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) throw new Error('Ошибка при получении списка педагогов');


        const data = await response.json();
        console.log(data.data);
        return data.data;

    } catch (error) {
        console.error('Ошибка при загрузке списка педагогов:', error);
        alert('Не удалось загрузить список педагогов');
    }
}