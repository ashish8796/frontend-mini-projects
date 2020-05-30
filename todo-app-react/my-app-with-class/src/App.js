import React, { useState } from 'react';
import './App.css';
import Todo from "./todos";

function App() {
  const [todoValue, setTodoValue] = useState('');
  const [todoArr, setTodoArr] = useState([]);

  function inputHandler(e) {
    e.preventDefault()

    const todoObj = {
      value: todoValue,
      isCompleted: false,
      id: Date.now()
    }

    const arr = [...todoArr, todoObj]
    setTodoArr(arr)
    setTodoValue("")
  }


  function handleInputChange(e) {
    setTodoValue(e.target.value);
  }

  const handleToggleTodo = (id) => {
    const todoIndex = todoArr.findIndex(t => t.id === id);
    const newTodos = [...todoArr];

    newTodos[todoIndex].isCompleted = !newTodos[todoIndex].isCompleted;

    setTodoArr(newTodos);
  }

  const handleDeletTodo = (id) => {
    const newTods = todoArr.filter(todo => todo.id !== id)
    setTodoArr(newTods)
  }

  const handleEditTodo = (id, editedValue) => {

    const newTodos = todoArr.map(todo => {
      todo.value = todo.id === id ? editedValue : todo.value;
      return todo;
    })

    // const todoIndex = todoArr.findIndex(t => t.id === id);
    // const newTodos = [...todoArr];

    // newTodos[todoIndex].value = editedValue

    setTodoArr(newTodos);

  }

  return (
    <div className="wrapper">
      <div className="heading">
        <h1>Todos</h1>
      </div>
      <div className="todo-list">
        {
          todoArr && todoArr.map(todo => {
            return <Todo todo={todo} key={todo.id} toggleTodo={handleToggleTodo} deletTodo={handleDeletTodo} editTodo={handleEditTodo} />;
          })
        }
      </div>
      <form className="add-todo-form" onSubmit={inputHandler}>
        <input value={todoValue} type="text" className="add-todo-input" placeholder="Add todo here!" onChange={handleInputChange} />
      </form>
    </div>
  );
}

export default App;
