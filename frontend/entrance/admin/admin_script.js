function showContent(role) {
    const content = document.querySelector('.container');
    const roleData = {
        supervisor: "../list/list_supervisor/list_supervisor_index.html",
        curator: "../list/list_curator/list_curator_index.html",
        teacher: "../list/list_teacher/list_teacher_index.html",
        children: "../list/list_children/list_children_index.html"
    };

    window.location.href = roleData[role];

    fetch(roleData[role])
        .then(response => response.text())
        .then(data => {
            content.innerHTML = data;
        })
        .catch(error => {
            console.error('Ошибка загрузки контента:', error);
        });
}
