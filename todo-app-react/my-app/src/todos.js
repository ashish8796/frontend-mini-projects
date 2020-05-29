import React, { useState } from "react";

const Todo = (props) => {
  const { todo, toggleTodo, deletTodo, editTodo } = props;
  const [newValue, setNewValue] = useState(todo.value);

  const handleEditInput = (e) => {
    const { editedValue } = e.tartget;
    setNewValue(editedValue)
  }

  const handleDoubleClick = (e) => {
    e.target.style.display = "none";

  }
  return (
    <div className="todo" >
      <div className="item-value" id={"todo-" + todo.id}>
        <input type="checkbox" className="ckbox" checked={todo.isCompleted} onChange={() => {
          toggleTodo(todo.id)
        }} />
        <p id={"todo-" + todo.id} onDoubleClick={handleDoubleClick}>{todo.value}</p>
        <form className="edit-todo-form" onSubmit={() => {
          editTodo(todo.id, newValue)
        }}>
          <input type="text" className="edit" id={"todo-" + todo.id} onChange={handleEditInput} />
        </form>
      </div>
      <div className="delet-div" id={"todo-" + todo.id} onClick={() => {
        deletTodo(todo.id)
      }}>

      </div>
    </div>
  )
}

export default Todo;