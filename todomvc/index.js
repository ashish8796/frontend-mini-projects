
// Need to make an function for adding todo in the markUP

function generateTodos(arr) {

  const todoStr = arr.map(elem =>
    `
    <div class="items">
      <div id="ckbox">
        <div class="circle" data-id="${elem.id}">
        <img class="tick ${elem.isCompleted && "visible"}" data-id="${elem.id}" src="img/tick.svg" /></div>
      </div>
      <div class="edit">
        <p data-id="${elem.id}" class="para-value" style="${elem.isCompleted ? "text-decoration: line-through" : "text-decoration: none"}">${elem.value} </p>
        <form class="edit-form"><input type="text" class="display" value="${elem.value}"/></form>
      </div>
      <div class="Button">
        <button class="delete-btn" data-id="${elem.id}">X</button>
      </div>
    </div>
    `
  ).join('');

  return todoList.innerHTML = todoStr;

}

const deletTodo = (itemId) => {
  todoArr = todoArr.filter(elem => elem.id != itemId);
  generateTodos(todoArr);
  itemsLeft.innerText = `${todoArr.length} items left`;
}

const toggleTodo = (itemId) => {
  const index = todoArr.findIndex(elem => elem.id == itemId);
  todoArr[index].isCompleted = !todoArr[index].isCompleted;
  itemsLeft.innerText = `${todoArr.length - todoArr.filter(elem => elem.isCompleted).length} items left`;
  generateTodos(todoArr);
}

const mkBtnVbl = (btnText, tabs) => {
  for (let i of tabs) {
    if (i.innerText.toLowerCase() == btnText) {
      i.classList.add('clr-btn');
    } else {
      i.classList.remove('clr-btn');
    }
  }
}

let todoArr = [];
const itemsLeft = document.querySelector('#left-items');
const inputTodo = document.querySelector('#todo');
const form = document.querySelector('.todo');
const todoList = document.querySelector('.todo-list');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  //add todo to array in the following way
  const todo = {
    value: inputTodo.value,
    isCompleted: false,
    id: todoArr.length + 1
  }

  todoArr.push(todo);
  inputTodo.value = '';

  //Add todo markup in the html file
  generateTodos(todoArr);
  itemsLeft.innerText = `${todoArr.length} items left`;

  const editForm = document.querySelector('.edit-form');

  editForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const innerFormTodo = event.target.querySelector('input').value

    index = todoArr.findIndex(elem => elem.id == itemId);

    todoArr[index].value = innerFormTodo;
    generateTodos(todoArr);
  })
})

let editItem= null;
let itemId = null;

todoList.addEventListener('click', (event) => {
  const clickedItem = event.target;
  const itemId = clickedItem.dataset.id

  if (clickedItem.classList.contains('delete-btn')) {
    deletTodo(itemId);
  }

  if (clickedItem.classList.contains('circle')) {
    toggleTodo(itemId);
  }

  if (clickedItem.classList.contains('visible')) {
    toggleTodo(itemId);
  }

  if (clickedItem.classList.contains('display')) {
    editItem = clickedItem.value;
  }
})

const activeBtn = document.querySelector('.active');
const completeBtn = document.querySelector('.complete');
const allBtn = document.querySelector('.all');
const clearBtn = document.querySelector('.clear');
let btnText = "all";
const tabs = [activeBtn, completeBtn, allBtn];

allBtn.addEventListener('click', (event) => {
  btnText = event.target.innerText.toLowerCase();
  generateTodos(todoArr);
  itemsLeft.innerText = `${todoArr.length} items left`;
  mkBtnVbl(btnText, tabs)
})

activeBtn.addEventListener('click', (event) => {
  btnText = event.target.innerText.toLowerCase();
  let activeItem = todoArr.filter(elem => elem.isCompleted == false)
  generateTodos(activeItem);
  itemsLeft.innerText = `${activeItem.length} items left`;
  mkBtnVbl(btnText, tabs)
})

completeBtn.addEventListener('click', (event) => {
  btnText = event.target.innerText.toLowerCase();
  let completedItem = todoArr.filter(elem => elem.isCompleted == true);
  generateTodos(completedItem)
  itemsLeft.innerText = `${completedItem.length} items left`;
  mkBtnVbl(btnText, tabs)
})

clearBtn.addEventListener('click', (event) => {
  todoArr = todoArr.filter(elem => elem.isCompleted == false)
  generateTodos(todoArr);
  itemsLeft.innerText = `${todoArr.length} items left`;
})

todoList.addEventListener('dblclick', (event) => {
  const targetedItem = event.target;
  if (targetedItem.classList.contains('para-value')) {
    targetedItem.parentElement.children[1].classList.remove('edit-form')
    targetedItem.style.display = 'none';
    itemId = targetedItem.dataset.id;
  }
})
