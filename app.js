// DOM elements
const todoForm = document.getElementById('todo-form');
const todoList = document.querySelector('.todos');
const totalTasks = document.getElementById('total-tasks');
const remainingTasks = document.getElementById('remaining-tasks');
const completedTasks = document.getElementById('completed-tasks');
const mainInput = document.querySelector('#todo-form input');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

todoForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    const inputValue = mainInput.value;

    if(inputValue == ''){
        return;
    }

    const task = {
        id: new Date().getTime(),
        name: inputValue,
        isCompleted: false,
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    createTask(task);

    todoForm.reset();
    mainInput.focus();
});

function createTask(task){
    const taskEl = document.createElement('li');

    taskEl.setAttribute('id', task.id);

    if(task.isCompleted){
        taskEl.classList.add('complete');
    }

    const taskElMarkup = `
        <div>
            <input type="checkbox" name="tasks" id="${task.id}" ${task.isCompleted ? 'checked' : ''}>
            <span ${!task.isCompleted ? 'contenteditable' : ''}>${task.name}</span>
        </div>
        <button title="Remove the "${task.name}" task" class="remove-task"><img src="assets/X.svg" alt="*"></button>
    `;

    taskEl.innerHTML = taskElMarkup;

    todoList.appendChild(taskEl);
}