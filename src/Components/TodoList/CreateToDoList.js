import classes from "./CreateTodoList.module.css";
import EditTodoItem from "./EditTodoItem";
import TodoItem from "./TodoItem";
import React from "react";

const CreateToDoList = (props) => {
  return (
    <ul className={classes.ul}>
      {props.todos.map((todo) => {
        return todo.isEditing ? (
          <EditTodoItem
            key={todo.id}
            todo={todo}
            setTodos={props.setTodos}
            classes={classes}
          />
        ) : (
          <TodoItem
            key={todo.id}
            todo={todo}
            classes={classes}
            updatetodo={props.updateTodo}
            setTodos={props.setTodos}
            onDelete={props.onDelete}
          />
        );
      })}
    </ul>
  );
};
export default CreateToDoList;
