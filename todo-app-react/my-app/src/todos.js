import React, { useState } from "react";

const Todo = (props) => {
  const { todo, toggleTodo, deletTodo, editTodo } = props;
  const [newValue, setNewValue] = useState(todo.value);
  const [editMode, setEditMode] = useState(false);

  const handleEditInput = (e) => {
    const { value } = e.target;
    setNewValue(value);
  };

  const handleDoubleClick = (e) => {
    setEditMode(true)
  };

  return (
    <div className="todo">
      <div className="item-value" id={"todo-" + todo.id}>
        <input
          type="checkbox"
          className="ckbox"
          checked={todo.isCompleted}
          onChange={() => {
            toggleTodo(todo.id);
          }}
        />
        {
          !editMode ? (
            <p id={"todo-" + todo.id} onDoubleClick={handleDoubleClick}>
              {todo.value}
            </p>
          ) : (
              <form
                className="edit-todo-form"
                onSubmit={() => {
                  editTodo(todo.id, newValue);
                  setEditMode(false);
                }}
              >
                <input
                  type="text"
                  className="edit"
                  id={"todo-" + todo.id}
                  onChange={handleEditInput}
                  autoFocus
                />
              </form>
            )
        }

      </div>
      <div
        className="delet-div"
        id={"todo-" + todo.id}
        onClick={() => {
          deletTodo(todo.id);
        }}
      ></div>
    </div>
  );
};

export default Todo;
