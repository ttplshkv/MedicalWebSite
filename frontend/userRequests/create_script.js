import {parseRoleFromSingularToPlural} from "../entrance/list/list_script.js";

export async function linkRelatedUserFromUser(userId, relatedRole, relatedUserId) {
    const serverUrl = `http://localhost:8081/api`;
    const addressRole = parseRoleFromSingularToPlural(role);
    const relatedAddressRole = parseRoleFromSingularToPlural(relatedRole);
    const address = `${serverUrl}/${addressRole}/${userId}/${relatedAddressRole}/${relatedUserId}`;

    console.log(address);
    try {
        const response = await fetch(address, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Ошибка при прикреплении пользователя: ${response.status}`);
        }

        const result = await response.json();
        console.log("Ответ от сервера:", result);

        if (result.status === "success") {
            alert(result.message || "Пользователь успешно прикреплен");
            await renderRelatedUserListByUserId(userId);
        } else {
            alert("Ошибка при прикреплении: " + (result.message || "Неизвестная ошибка."));
        }
    } catch (error) {
        console.error("Ошибка при прикреплении пользователя:", error);
        alert("Произошла ошибка при прикреплении пользователя.");
    }
}
