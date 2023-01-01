"use strict";
//localStorage.clear() // for clearing local storage data
showDisplay();
let items = [];
class Task {
    constructor(task, key) {
        this.date = new Date();
        this.complete = false;
        this._task = task;
        this._key = key;
    }
}
const button = document.getElementById('button');
const inputField = document.getElementById('input');
const clearButton = document.getElementById('clear-button');
function showDisplay() {
    let todos = [];
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        console.log(key);
        let todo = localStorage.getItem(key);
        if (todo != null) {
            let item = JSON.parse(todo);
            if (item._task != undefined || item._task != null) {
                todos.push(item);
            }
        }
    }
    console.log(todos);
    todos.forEach((todo) => {
        let ul = document.querySelector('ul');
        let li = document.createElement('li');
        let div = document.createElement('div');
        let buttonDiv = document.createElement('div');
        buttonDiv.classList.add('button-div');
        div.classList.add('todo-div');
        let text = document.createElement('p');
        text.innerText = todo._task;
        let delButton = document.createElement('button');
        delButton.innerText = "Delete";
        delButton.classList.add("delete-button");
        delButton.addEventListener("click", () => deleteTodo(todo._key));
        buttonDiv.append(delButton);
        div.append(text, buttonDiv);
        li.append(div);
        ul === null || ul === void 0 ? void 0 : ul.append(li);
    });
    let tasksP = document.getElementById("total-tasks");
    tasksP.innerText = `Total Tasks: ${todos.length}`;
}
function createTodo(task) {
    if (inputField != null) {
        let myTodo = new Task(task, 'todo' + JSON.stringify(localStorage.length + 1));
        inputField.innerText = '';
        localStorage.setItem(`todo${localStorage.length + 1}`, JSON.stringify(myTodo));
        let lifetimecount = Number(localStorage.getItem("lifetime-tasks"));
        lifetimecount++;
        localStorage.setItem("lifetime-tasks", JSON.stringify(lifetimecount));
        console.log(`todo added with key - ${myTodo._key}`);
        window.location.reload();
        showDisplay();
    }
}
button === null || button === void 0 ? void 0 : button.addEventListener('click', () => createTodo(inputField === null || inputField === void 0 ? void 0 : inputField.value));
clearButton === null || clearButton === void 0 ? void 0 : clearButton.addEventListener('click', () => clearTodos());
function deleteTodo(key) {
    localStorage.removeItem(key);
    window.location.reload();
    console.log(`${key} was delete`);
}
function clearTodos() {
    localStorage.clear();
    window.location.reload();
}
if (clearButton != null) {
    if (!(localStorage.length <= 1)) {
        clearButton.style.display = "inline";
    }
    else {
        clearButton.style.display = "none";
    }
}
