import {getUsers} from "../../userRequests/get_script.js";
import {updateUser} from "../../userRequests/update_script.js";
import {linkRelatedUserFromUser} from "../../userRequests/create_script.js";
import {unlinkRelatedUserFromUser} from "../../userRequests/delete_script.js";
import {deleteUser} from "../../userRequests/delete_script.js";
import {getRelatedUserListByRoleAndUserId} from "../../userRequests/get_script.js";

let role = null;
let selectedUser = null;

const modal = document.getElementById("user-modal");
const modalList = document.getElementById("list-modal");

export function parseRoleFromSingularToPlural(role) {
    if (!role || typeof role !== "string") {
        console.log('Роль установлена:', role);
        throw new Error("Invalid role: role must be a non-empty string.");
    }

    if (role === "child") {
        return `children`;
    } else {
        return `${role}s`;
    }
}

export function setRole(roleParam) {
    role = roleParam;
    return role;
}

export async function updateUserListOnPage() {
    try {
        const usersList = await getUsers(role);
        displayUsers(usersList);
    } catch (error) {
        console.error("Ошибка при обновлении списка пользователей:", error);
    }
}

// Функция для отображения списка пользователей
function displayUsers(users) {
    if (!users || !Array.isArray(users)) {
        console.error("Получен некорректный список пользователей:", users);
        return;
    }
    const userList = document.getElementById("user-list");
    if (!userList) {
        console.error('Элемент для отображения списка пользователей не найден');
        return;
    }

    userList.innerHTML = '';

    users.forEach(user => {
        const userItem = document.createElement("li");
        userItem.classList.add("user-item");

        // Контейнер для текста пользователя
        const userText = document.createElement("span");
        userText.textContent = `${user.lastname} ${user.name} ${user.secondname}`;
        userItem.addEventListener("click", () => openModal(user));
        userItem.appendChild(userText);

        // Кнопка удаления
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-btn");
        deleteButton.textContent = "Удалить";
        deleteButton.onclick = (event) => {
            event.stopPropagation();
            deleteUser(user.id);
        };

        userItem.appendChild(deleteButton);

        userList.appendChild(userItem);
    });
}

async function openModal(user) {
    selectedUser = user;
    if (user != null) {
    document.getElementById("edit-lastname").value = user.lastname;
    document.getElementById("edit-name").value = user.name;
    document.getElementById("edit-secondname").value = user.secondname;
    document.getElementById("edit-birthDate").value = user.birthDate;
    await renderRelatedUserListByUserId(user.id);

    modal.classList.remove("hidden");
    }
}
    let tempUsers = [];

document.addEventListener("DOMContentLoaded", async () => {
    const userList = document.getElementById("user-list");
    const closeModal = document.getElementById("close-modal");
    const userEditForm = document.getElementById("userEditForm");

    if (closeModal) {
        closeModal.addEventListener("click", () => {
            modal.classList.add("hidden");
            selectedUser = null;
        });
    }

    if (userEditForm != null) {
        userEditForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            if (!selectedUser) return;

            selectedUser.lastname = document.getElementById("edit-lastname").value;
            selectedUser.name = document.getElementById("edit-name").value;
            selectedUser.secondname = document.getElementById("edit-secondname").value;
            selectedUser.birthDate = document.getElementById("edit-birthDate").value;

            console.log('teacher id after save button', selectedUser.teacherIds);
            selectedUser.teacherIds.forEach(id => console.log(id));

            console.log('child id after save button', selectedUser.childIds);
            selectedUser.childIds.forEach(id => console.log(id));

            let serverUrl = `http://localhost:8081/api/`;
            let addressByRole = parseRoleFromSingularToPlural(role);
            let address = `${serverUrl}${addressByRole}/${selectedUser.id}`;

            console.log(selectedUser.childIds);

            await updateUser(address, selectedUser);

            window.location.href = `/frontend/entrance/list/list_${role}/list_${role}_index.html`;

            modal.classList.remove("hidden");
        });
    }
});

async function renderRelatedUserListByUserId(userId) {
    switch (role) {
        case 'curator':
            await renderRelatedUserList(userId, await getRelatedUserListByRoleAndUserId('teacher', userId), 'teacher');
            await renderRelatedUserList(userId, await getRelatedUserListByRoleAndUserId('child', userId), 'child');
            break;
        case 'teacher':
            await renderRelatedUserList(userId, await getRelatedUserListByRoleAndUserId('child', userId), 'child');
            break;
    }
}

async function renderRelatedUserList(userId, users, relatedRole) {
    console.log(relatedRole +'-list');
    let userList = document.getElementById(relatedRole + `-list`);
    let userIdsList = document.getElementById(relatedRole + `-Ids-list`);
    userList.innerHTML = '';

    if (users.length === 0) {
        const noUsersMessage = document.createElement('li');
        noUsersMessage.textContent = 'Список пуст';
        userList.appendChild(noUsersMessage);
        return;
    }

    for (const relatedUser of users) {
        // Создаем элемент списка
        let li = document.createElement('li');
        li.innerHTML = `${relatedUser.lastname} ${relatedUser.name} ${relatedUser.secondname}`;

        const button = document.createElement("button-unlink");
        button.textContent = "Отвязать";
        button.addEventListener("click", async () => {
            if (relatedRole === 'teacher') {
                console.log('id before unlink', selectedUser.teacherIds);
                selectedUser.teacherIds.forEach(id => console.log(id));
                selectedUser.teacherIds = selectedUser.teacherIds.filter(id => id !== relatedUser.id);
                users = users.filter(user => user.id !== relatedUser.id);

                console.log('filtered teacher:', users);
                renderRelatedUserList(userId, users, relatedRole);

                console.log('id after unlink', selectedUser.teacherIds);

            } else if (relatedRole === 'child') {
                console.log('id before unlink', selectedUser.childIds);
                selectedUser.childIds = selectedUser.childIds.filter(id => id !== relatedUser.id);

                users = users.filter(user => user.id !== relatedUser.id);
                console.log('filtered child:', users);

                renderRelatedUserList(userId, users, relatedRole);
                console.log('id after unlink', selectedUser.childIds);
            }
        });

        li.appendChild(button);
        userList.appendChild(li); // Добавляем элемент в список
        // userIdsList.appendChild(liIds);
    }
}


window.onload = () => {
        updateUserListOnPage();
};

