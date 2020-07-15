import { createStore } from "redux";
import { generateMarkup } from './subscribers';
import todos from "./todo.reducer";

const store = createStore(todos);
store.subscribe(() => {
  const state = store.getState();
  console.log(state)
  generateMarkup(state);
})
export default store;



