import classes from "./CreateTodoList.module.css";
import EditTodoItem from "./EditTodoItem";
import TodoItem from "./TodoItem";
import React from "react";

const CreateToDoList = (props) => {
  return (
    <ul className={classes.ul}>
      {props.todos.map((todo) => {
        return props.editId === todo.id ? (
          <EditTodoItem
            key={todo.id}
            todo={todo}
            classes={classes}
            getEditValue={props.getEditValue}
            onSubmit={props.submitEdit}
          />
        ) : (
          <TodoItem
            key={todo.id}
            todo={todo}
            classes={classes}
            updatetodo={props.updateTodo}
            onEdit={props.onEdit}
            onDelete={props.onDelete}
          />
        );
      })}
    </ul>
  );
};

export default CreateToDoList;
