
document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {
    const taskList = document.getElementById('task-list');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {
        const li = createTaskElement(task.text, task.completed);
        taskList.appendChild(li);
    });
}

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

    if (taskText === '' || taskText.length > 100) {
        alert("La tarea no debe estar vacía y debe tener un máximo de 100 caracteres.");
        return;
    }

    const taskList = document.getElementById('task-list');
    const li = createTaskElement(taskText, false);
    taskList.appendChild(li);
    saveTask({ text: taskText, completed: false });
    taskInput.value = '';
    updateCharCount(); // Actualizar el contador después de agregar la tarea
}

function createTaskElement(taskText, completed) {
    const li = document.createElement('li');
    li.innerHTML = `<div class="circle"></div><span>${taskText}</span><button class="delete-btn" onclick="deleteTask(this)">✖</button>`;
    if (completed) {
        li.classList.add('completed');
    }
    li.addEventListener('click', toggleComplete);
    return li;
}

function toggleComplete(event) {
    if (event.target.tagName.toLowerCase() === 'button') return;

    const taskItem = event.currentTarget;
    taskItem.classList.toggle('completed');

    const taskText = taskItem.querySelector('span').textContent;
    updateTaskStatus(taskText, taskItem.classList.contains('completed'));
}

function deleteTask(button) {
    const taskItem = button.parentElement;
    const taskText = taskItem.querySelector('span').textContent;

    removeTask(taskText);
    taskItem.remove();
}

function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskStatus(taskText, completed) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const updatedTasks = tasks.map(task => {
        if (task.text === taskText) {
            return { ...task, completed };
        }
        return task;
    });

    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

function removeTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function checkEnter(event) {
    if (event.key === 'Enter') {
        addTask();
    }
}

function updateCharCount() {
    const taskInput = document.getElementById('new-task');
    const charCountDisplay = document.getElementById('char-count');
    const charCount = taskInput.value.length;
    charCountDisplay.textContent = `${charCount}/100`;
}
