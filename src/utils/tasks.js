window.addEventListener('DOMContentLoaded', () => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    const userData = JSON.parse(localStorage.getItem(currentUser));
    const pendingList = document.getElementById('pending-tasks');
    const completedList = document.getElementById('completed-tasks');
    const addBtn = document.getElementById('add-task-btn');

    function saveUserData() {
        localStorage.setItem(currentUser, JSON.stringify(userData));
    }

    function renderTasks() {
        pendingList.innerHTML = "";
        completedList.innerHTML = "";

        userData.todos.notDone.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = "flex justify-between items-center bg-white text-gray-800 p-4 rounded shadow";
            li.innerHTML = `
                <span>${task}</span>
                <button class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Done</button>
            `;
            li.querySelector('button').addEventListener('click', () => {
                userData.todos.done.push(task);
                userData.todos.notDone.splice(index, 1);
                saveUserData();
                renderTasks();
            });
            pendingList.appendChild(li);
        });

        userData.todos.done.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = "flex justify-between items-center bg-white p-4 rounded shadow";
            li.innerHTML = `
                <span class="line-through text-gray-500">${task}</span>
                <button class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Delete</button>
            `;
            li.querySelector('button').addEventListener('click', () => {
                userData.todos.done.splice(index, 1);
                saveUserData();
                renderTasks();
            });
            completedList.appendChild(li);
        });
    }

    addBtn.addEventListener('click', () => {
        const task = prompt("Enter your task:");
        if (task && task.trim()) {
            userData.todos.notDone.push(task.trim());
            saveUserData();
            renderTasks();
        }
    });

    renderTasks();
});
