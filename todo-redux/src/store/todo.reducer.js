import { createStore } from "redux";
import { ADD_TODO, COMPLETED_TODO, DELETE_TODO } from "./types";

let initialState = [];

export const actions = {
  addTodo(todo) {
    return {
      type: ADD_TODO,
      payload: {
        todo
      }
    }
  },
  completeTodo(id) {
    return {
      type: COMPLETED_TODO,
      payload: {
        id: id
      }
    }
  },
  deleteTodo(id) {
    return {
      type: DELETE_TODO,
      payload: {
        id: id
      }
    }
  }

}


export default function todos(state = initialState, action) {
  switch (action.type) {

    case ADD_TODO: {
      const { payload } = action;

      const newTodo = {
        value: payload.todo,
        isCompleted: false,
        id: Date.now()
      };

      return [...state, newTodo];
    }
    case COMPLETED_TODO: {
      const newState = state.map(item => {
        return item.id != action.payload.id ? item : {
          value: item.value,
          id: Date.now(),
          isCompleted: !item.isCompleted
        }
      })
      return newState;
    }
    case DELETE_TODO: {
      const newState = state.filter(item => item.id != action.payload.id)
      return newState;
    }

    default: return state
  }
}