export async function updateUser(url, userUpdatedData) {
    console.log("update: ", userUpdatedData.childIds);

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userUpdatedData),
        });

        // Проверка успешного ответа
        if (!response.ok) {
            // Проверка, является ли ответ JSON
            let errorResponse;
            try {
                errorResponse = await response.json();
            } catch {
                throw new Error(`Ошибка при обновлении данных. Код ошибки: ${response.status}`);
            }

            throw new Error(errorResponse.message || "Ошибка при обновлении данных");
        }

        const responseData = await response.json();
        console.log("Ответ сервера:", responseData);

        // Уведомление об успешном обновлении
        alert(responseData.message || "Данные пользователя успешно обновлены!");

    } catch (error) {
        console.error("Ошибка при сохранении изменений:", error);

        alert(`Не удалось сохранить изменения: ${error.message}`);
    }
}
