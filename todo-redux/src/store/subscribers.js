import store from "."

const todoList = document.querySelector(".todo-list");

export const generateMarkup = (state) => {
  const markup = state.map(item => {
    return `
    <div class="todo" id=${item.id}>
      <div class="todo-value">
        <input type="checkbox" class="ckbox" id=${item.id} ${item.isCompleted && "checked"}>
        <p id=${item.id}>${item.value}</p>
      </div>
      <button id=${item.id} class="delete">X</button>
    </div>
  `
  }).join("")

  todoList.innerHTML = markup;

}