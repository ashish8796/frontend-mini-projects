//Form related variable
const form = document.querySelector('.todo');
const inputTodo = document.querySelector('#todo');
const todoList = document.querySelector('.todo-list');
const itemsLeft = document.querySelector('#left-items');

//Variables of different types of the buttons
const activeBtn = document.querySelector('.active');
const completeBtn = document.querySelector('.complete');
const allBtn = document.querySelector('.all');
const clearBtn = document.querySelector('.clear');


//Constructor function for making a Todo list object
function MakeTodos() {
  this.todoArr = [];
}

//Creating a todos object
let todos = new MakeTodos();

//Adding push method in the prototype of the Maketodos
MakeTodos.prototype.push = function (value) {
  return this.todoArr.push(value);
}

//Adding toggleTodo method in the prototype of the MakeTodos
MakeTodos.prototype.toggleTodo = function (itemId) {
  const index = todos.todoArr.findIndex(elem => elem.id == itemId);
  todos.todoArr[index].isCompleted = !(todos.todoArr[index].isCompleted);
  itemsLeft.innerText = `${todos.todoArr.length - todos.todoArr.filter(elem => elem.isCompleted).length} items left`;
}

//Adding deletTodo method in the prototype of the MakeTodos
MakeTodos.prototype.deletTodo = function (itemId) {
  todos.todoArr = todos.todoArr.filter(elem => elem.id != itemId);
  itemsLeft.innerText = `${todos.todoArr.length} items left`;
}

//Set Local storage values
MakeTodos.prototype.setLocalStorage = function () {
  return localStorage.setItem('user', JSON.stringify(todos.todoArr));
}

//Get local storage 
MakeTodos.prototype.getLocalStorage = function () {
  return JSON.parse(localStorage.getItem('user'));
}

//Constructor function for generating markup
function TodosMarkup() {
  this.markup = '';
}
TodosMarkup.prototype.generateMarkup = function (arr) {
  this.markup = arr.map(elem =>
    `
    <div class="items">
      <div id="ckbox">
        <div class="circle" data-id="${elem.id}">
        <img class="tick ${elem.isCompleted && "visible"}" data-id="${elem.id}" src="img/tick.svg" /></div>
      </div>
      <div class="edit">
      <p data-id="${elem.id}" class="para-value" style="${elem.isCompleted ? "text-decoration: line-through" : "text-decoration: none"}">${elem.value} </p>
        <form class="edit-form edit-todo"><input data-id="${elem.id}" type="text" value="${elem.value}"/></form>
      </div>
      <div class="Button">
        <button class="delete-btn" data-id="${elem.id}">X</button>
      </div>
    </div>
    `
  ).join('')
  return this.markup;
}

let newMarkup = new TodosMarkup();
let itemId = null;
todos.todoArr = localStorage.getItem('user') ? todos.getLocalStorage() : [];
newMarkup.generateMarkup(todos.todoArr);
todoList.innerHTML = newMarkup.markup;
itemsLeft.innerText = `${todos.todoArr.length} items left`;

form.addEventListener('submit', (event) => {
  event.preventDefault();

  //add todo to array
  todos.push({
    value: inputTodo.value,
    isCompleted: false,
    id: (todos.todoArr.length) + 1
  })
  inputTodo.value = '';

  newMarkup.generateMarkup(todos.todoArr);
  todoList.innerHTML = newMarkup.markup;
  todos.setLocalStorage();
  itemsLeft.innerText = `${todos.todoArr.length} items left`;
})

todoList.addEventListener('click', (event) => {
  const clickedItem = event.target;
  itemId = clickedItem.dataset.id

  if (clickedItem.classList.contains('delete-btn')) {
    todos.deletTodo(itemId);
    newMarkup.generateMarkup(todos.todoArr);
    todoList.innerHTML = newMarkup.markup;
    todos.setLocalStorage();
  }

  if (clickedItem.classList.contains('circle')) {
    todos.toggleTodo(itemId);
    newMarkup.generateMarkup(todos.todoArr);
    todoList.innerHTML = newMarkup.markup;
    todos.setLocalStorage();
  }

  if (clickedItem.classList.contains('visible')) {
    todos.toggleTodo(itemId);
    newMarkup.generateMarkup(todos.todoArr);
    todoList.innerHTML = newMarkup.markup;
    todos.setLocalStorage();
  }
})

todoList.addEventListener('dblclick', (event) => {
  const targetedItem = event.target;
  if (targetedItem.classList.contains('para-value')) {
    targetedItem.parentElement.children[1].classList.remove('edit-form')
    targetedItem.style.display = 'none';
    const editForm = document.querySelector('.edit-todo');

    editForm.addEventListener('submit', (event) => {
      event.preventDefault();
      let innerFormTodo = event.target.querySelector('input').value;

      itemId = event.target.querySelector('input').dataset.id;
      index = todos.todoArr.findIndex(elem => elem.id == itemId);

      todos.todoArr[index].value = innerFormTodo;
      newMarkup.generateMarkup(todos.todoArr)
      todoList.innerHTML = newMarkup.markup;
      todos.setLocalStorage();
    })
  }
})

let btnText = "all";
const tabs = [activeBtn, completeBtn, allBtn];

const mkBtnVbl = (btnText, tabs) => {
  for (let i of tabs) {
    if (i.innerText.toLowerCase() == btnText) {
      i.classList.add('clr-btn');
    } else {
      i.classList.remove('clr-btn');
    }
  }
}

allBtn.addEventListener('click', (event) => {
  btnText = event.target.innerText.toLowerCase();
  newMarkup.generateMarkup(todos.todoArr)
  todoList.innerHTML = newMarkup.markup;
  todos.setLocalStorage();
  itemsLeft.innerText = `${todos.todoArr.length} items left`;
  mkBtnVbl(btnText, tabs)

})

activeBtn.addEventListener('click', (event) => {
  btnText = event.target.innerText.toLowerCase();
  let activeItem = todos.todoArr.filter(elem => elem.isCompleted == false)
  newMarkup.generateMarkup(activeItem)
  todoList.innerHTML = newMarkup.markup;
  itemsLeft.in1nerText = `${activeItem.length} items left`;
  mkBtnVbl(btnText, tabs)
})

completeBtn.addEventListener('click', (event) => {
  btnText = event.target.innerText.toLowerCase();
  let completedItem = todos.todoArr.filter(elem => elem.isCompleted == true);
  newMarkup.generateMarkup(completedItem)
  todoList.innerHTML = newMarkup.markup;
  itemsLeft.innerText = `${completedItem.length} items left`;
  mkBtnVbl(btnText, tabs)
})

clearBtn.addEventListener('click', (event) => {
  todos.todoArr = todos.todoArr.filter(elem => elem.isCompleted == false)
  newMarkup.generateMarkup(todos.todoArr)
  todoList.innerHTML = newMarkup.markup;
  localStorage.setItem('user', JSON.stringify(todos.todoArr));
  itemsLeft.innerText = `${todos.todoArr.length} items left`;
})