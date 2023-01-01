//localStorage.clear() // for clearing local storage data
showDisplay()

let items:any = []

interface Todo {
    _task: string,
    date: Date,
    complete: boolean,
    _key: string
}

class Task implements Todo {
    _task: string 
    date: Date = new Date()
    complete:boolean = false
    _key: string

    constructor(task:string, key:string) {
        this._task = task
        this._key = key
    }
}

const button = document.getElementById('button')
const inputField:any = document.getElementById('input')
const clearButton = document.getElementById('clear-button')

function showDisplay() {
    let todos:any = []
    for(let i =0; i < localStorage.length; i++) {
        let key:any = localStorage.key(i)
        console.log(key)
        let todo: any = localStorage.getItem(key)
        if(todo != null) {
            let item = JSON.parse(todo)
            if(item._task != undefined || item._task != null) {
                todos.push(item)
            }
        }
    }
    console.log(todos)
        todos.forEach((todo:Todo) => {
            let ul = document.querySelector('ul')
            let li = document.createElement('li')
            let div = document.createElement('div')
            let buttonDiv = document.createElement('div')
            buttonDiv.classList.add('button-div')
            div.classList.add('todo-div')
            let text = document.createElement('p')
            text.innerText = todo._task
            let delButton = document.createElement('button')
            delButton.innerText = "Delete"
            delButton.classList.add("delete-button")
            delButton.addEventListener("click", () => deleteTodo(todo._key))
            buttonDiv.append(delButton)
            div.append(text,buttonDiv)
            li.append(div)
            ul?.append(li)
        });

    let tasksP:any = document.getElementById("total-tasks")
    tasksP.innerText = `Total Tasks: ${todos.length}`
}

function createTodo(task:string) {
    if(inputField != null) {
        let myTodo = new Task(task,'todo'+JSON.stringify(localStorage.length+1))
        inputField.innerText = ''
        localStorage.setItem(`todo${localStorage.length+1}`, JSON.stringify(myTodo))
        let lifetimecount = Number(localStorage.getItem("lifetime-tasks"))
        lifetimecount++
        localStorage.setItem("lifetime-tasks", JSON.stringify(lifetimecount))
        console.log(`todo added with key - ${myTodo._key}`)
        window.location.reload()
        showDisplay()
    }
}

button?.addEventListener('click', () => createTodo(inputField?.value))
clearButton?.addEventListener('click', () => clearTodos())


function deleteTodo(key:any) {
    localStorage.removeItem(key)
    window.location.reload()
    console.log(`${key} was delete`)
}

function clearTodos() {
    localStorage.clear()
    window.location.reload()
}


if(clearButton != null) {
    if(!(localStorage.length <= 1 )) {
        clearButton.style.display = "inline"
    }else {
        clearButton.style.display = "none"
    }
}


