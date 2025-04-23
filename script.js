let todoUserInput = document.getElementById("todoUserInput");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");
let todoItemsContainer = document.getElementById("todoItemsContainer");

let todosList = [];

function getTodosFromLocalStorage() {
  let storedTodos = localStorage.getItem("todosList");
  if (storedTodos) {
    todosList = JSON.parse(storedTodos);
    todosList.forEach(todo => createAndAppendTodo(todo));
  }
}

getTodosFromLocalStorage();

function createAndAppendTodo(todo) {
  let { text, uniqueNo, isChecked } = todo;

  let todoElement = document.createElement("li");
  todoElement.className = "todo-item-container";
  todoElement.id = "todo" + uniqueNo;

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "checkbox-input";
  checkbox.checked = isChecked;
  checkbox.onchange = () => toggleTodoStatus(uniqueNo);

  let labelContainer = document.createElement("div");
  labelContainer.className = "label-container";

  let label = document.createElement("label");
  label.className = "checkbox-label";
  label.textContent = text;
  label.id = "label" + uniqueNo;
  if (isChecked) label.classList.add("checked");

  let deleteIcon = document.createElement("i");
  deleteIcon.className = "fas fa-trash-alt delete-icon";  // Font Awesome Trash Icon
  deleteIcon.onclick = () => deleteTodo(uniqueNo);  // Attach the delete functionality

  labelContainer.appendChild(label);
  labelContainer.appendChild(deleteIcon);

  todoElement.appendChild(checkbox);
  todoElement.appendChild(labelContainer);

  todoItemsContainer.appendChild(todoElement);
}

function addTodo() {
  let userInput = todoUserInput.value.trim();
  if (userInput === "") {
    alert("Please enter a task.");
    return;
  }

  let newTodo = {
    text: userInput,
    uniqueNo: Date.now().toString(),
    isChecked: false,
  };

  todosList.push(newTodo);
  createAndAppendTodo(newTodo);
  todoUserInput.value = "";
}

function toggleTodoStatus(todoId) {
  let todo = todosList.find(t => t.uniqueNo === todoId);
  todo.isChecked = !todo.isChecked;

  let labelElement = document.getElementById("label" + todoId);
  labelElement.classList.toggle("checked");
}

function deleteTodo(todoId) {
  let todoElement = document.getElementById("todo" + todoId);
  todoItemsContainer.removeChild(todoElement);

  todosList = todosList.filter(t => t.uniqueNo !== todoId);
}

function saveTodosToLocalStorage() {
  localStorage.setItem("todosList", JSON.stringify(todosList));
}

addTodoButton.addEventListener("click", addTodo);
saveTodoButton.addEventListener("click", saveTodosToLocalStorage);
