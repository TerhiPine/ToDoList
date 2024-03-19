// retrieve todo from local storage, initialize an empty array

let todo = JSON.parse(localStorage.getItem("todo")) || [];
const toDoInput = document.getElementById("toDoInput");
const toDoList = document.getElementById("toDoList");
const toDoCount = document.getElementById("toDoCount");
const errorMsg = document.getElementById("errorMessage");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");

// initialize, evenlistener, tldr the todo-thing

document.addEventListener("DOMContentLoaded", function () {
    addButton.addEventListener("click", addTask);
    toDoInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            addTask();
        }
    });
    deleteButton.addEventListener("click", deleteAllTasks);
    displayTasks();
});

// task functions, add, display, edit.. ALL task-related things
//function for adding task. "trim" makes it cleaner, tidies if in input is uncalld spaces etc.
//plus error-code if input is too short

function addTask() {
    const newTask = toDoInput.value.trim();
    const length = newTask.length;
    if (newTask !== "" && length >= 3) {
        toDoInput.style.borderColor = "#d2d2d2bf";
        errorMsg.style.visibility = "hidden";
        todo.push({
            text: newTask,
            disabled: false,
        });
        saveToLocalStorage();
        toDoInput.value = "";
        displayTasks();
    }
    else { 
        toDoInput.style.borderColor = "red";
        errorMsg.style.visibility = "visible";
    }
}
//function for task display,
function displayTasks() {
    toDoList.innerHTML = "";
    todo.forEach((item, index) => {
        const p = document.createElement("p");
        p.innerHTML = `
            <div class="todo-container">
                <input type="checkbox" class="todo-checkbox" id="input-${index}" ${item.disabled ? "checked" : ""}>
                <p id="todo-${index}" class="${item.disabled ? "disabled" : ""
            }" onclick="editTask(${index})">${item.text}</p>
            </div>
            <button class="delete-button" onclick="deleteTask(${index})">x</button>
        `;
        p.querySelector(".todo-checkbox").addEventListener("change", () => {
            toggleTask(index);
        });
        toDoList.appendChild(p);
    });
    toDoCount.textContent = todo.length;
}

//function for editing mistakes in already added task
function editTask(index) {
    const todoItem = document.getElementById(`todo-${index}`);
    const existingText = todo[index].text;
    const inputElement = document.createElement("input");

    inputElement.value = existingText;
    todoItem.replaceWith(inputElement);
    inputElement.focus();

    //eventlistener; sharp when field active and blur when not

    inputElement.addEventListener("blur", function() {
        const updatedText = inputElement.value.trim();
        if (updatedText) {
            todo[index].text = updatedText;
            saveToLocalStorage();
        }
        displayTasks();
    });
}

//function for marking done

function toggleTask(index) {
    todo[index].disabled = !todo[index].disabled; 
    saveToLocalStorage();
    displayTasks();
}

// delete task, only one 
function deleteTask(index) {
    todo.splice(index, 1);
    saveToLocalStorage();
    displayTasks();
}

//delete ALL tasks
function deleteAllTasks() {
    todo = [];
    saveToLocalStorage();
    displayTasks();
}

//function for every task-function, to save it to local storage

function saveToLocalStorage(){
    localStorage.setItem("todo", JSON.stringify(todo));
}

