import "./../src/sass/index.scss";
import store from "./store";
import { actions } from "./store/todo.reducer";
const todoList = document.querySelector(".todo-list");

const form = document.querySelector("form");
const addTodo = document.getElementById("add-todo");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  store.dispatch(actions.addTodo(addTodo.value));
  addTodo.value = "";
})

todoList.addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("ckbox")) {
    store.dispatch(actions.completeTodo(target.getAttribute("id")))
  }

  if (target.classList.contains("delete")) {
    store.dispatch(actions.deleteTodo(target.getAttribute("id")))
  }
})

