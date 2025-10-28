import {parseRoleFromSingularToPlural, updateUserListOnPage} from "../entrance/list/list_script.js";

export async function unlinkRelatedUserFromUser(userId, relatedRole, relatedUserId) {
    const serverUrl = `http://localhost:8081/api`;
    const addressRole = parseRoleFromSingularToPlural(role);
    const relatedAddressRole = parseRoleFromSingularToPlural(relatedRole);
    const address = `${serverUrl}/${addressRole}/${userId}/${relatedAddressRole}/${relatedUserId}`;

    console.log(address);
    try {
        const response = await fetch(address, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Ошибка при отвязывании пользователя: ${response.status}`);
        }

        const result = await response.json();
        console.log("Ответ от сервера:", result);

        if (result.status === "success") {
            alert(result.message || "Пользователь успешно отвязан!");
            await renderRelatedUserListByUserId(userId);
        } else {
            alert("Ошибка при отвязывании: " + (result.message || "Неизвестная ошибка."));
        }
    } catch (error) {
        console.error("Ошибка при отвязывании пользователя:", error);
        alert("Произошла ошибка при отвязывании пользователя.");
    }
}

export async function deleteUser(id) {
    if (confirm(`Вы уверены, что хотите удалить пользователя с ID: ${id}?`)) {
        try {
            let serverUrl = `http://localhost:8081/api/`;
            let addressByRole = parseRoleFromSingularToPlural(role);
            let address = `${serverUrl}${addressByRole}/${id}`; // Формируем корректный URL с ID

            const response = await fetch(address, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Ошибка при удалении пользователя: ${response.status}`);
            }

            const result = await response.json();
            console.log("Ответ от сервера:", result);

            if (result.status === "success") {
                alert(result.message || "Пользователь успешно удален!");
                await updateUserListOnPage(); // Обновляем список пользователей
            } else {
                alert("Ошибка при удалении: " + (result.message || "Неизвестная ошибка."));
            }
        } catch (error) {
            console.error("Ошибка при удалении пользователя:", error);
            alert("Произошла ошибка при удалении пользователя.");
        }
    }
}
