const form = document.querySelector("form");
const todoList = document.querySelector(".todo-list");
const allBtn = document.getElementById("all");
const activeBtn = document.getElementById("active");
const completedBtn = document.getElementById("completed");
const clearCompletedBtn = document.getElementById("clear-completed");


let todoArr = [];

function generateTodo(array) {
  const todoString = array.map((todo) => {
    return `
      <div class="todo" data-id="${todo.id}">
        <input type="checkbox" data-id="${todo.id}" id="ckbox">
        <div class="image"></div>
        <p data-id="${todo.id} class="todo-value">${todo.todoValue}</p>
        <button class="delete" data-id="${todo.id}">X</button>
      </div>
    `
  }).join("");
  // console.log(todoString);
  return todoString;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputTodo = document.querySelector(".add-todo");

  const todoValue = inputTodo.value;
  const id = Date.now();
  const isCompleted = false;

  todoArr.push({ todoValue, id, isCompleted });
  inputTodo.value = "";
  console.log(todoArr)
  todoList.innerHTML = generateTodo(todoArr);
});

todoList.addEventListener("click", (event) => {
  const target = event.target;
  const id = target.dataset.id;

  if (target.classList.contains("delete")) {
    todoArr = todoArr.filter((todo) => todo.id != id);
    todoList.innerHTML = generateTodo(todoArr);
  }

  if (event.target.classList.contains("todo-value")) {
    console.log(event.target)
    console.log(event.target.dataset.id);
  }

  if (target.id === "ckbox") {
    console.log(target.checked);
    const index = todoArr.findIndex((todo) => todo.id == id);
    todoArr[index] = {
      todoValue: todoArr[index].todoValue,
      id: todoArr[index].id,
      isCompleted: !todoArr[index].isCompleted
    }
    todoList.innerHTML = generateTodo(todoArr);
    // toggleImage(target)
  }
})

function toggleImage(e) {
  const image = document.querySelector(".image");
  image.style.display = e.checked ? "block" : "none";
}


activeBtn.addEventListener("click", (event) => {
  const target = event.target;
  const arr = todoArr.filter(todo => !todo.isCompleted)
  todoList.innerHTML = generateTodo(arr);
})