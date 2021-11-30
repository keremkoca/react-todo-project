import classes from "./CreateTodoList.module.css";
import EditTodoItem from "./EditTodoItem";
import TodoItem from "./TodoItem";
import React from "react";
import { useState } from "react";

const CreateToDoList = (props) => {
  const [todoEditing, setTodoEditing] = useState(null);
  return (
    <ul className={classes.ul}>
      {props.todos.map((todo) => {
        return todoEditing === todo.id ? (
          <EditTodoItem
            key={todo.id}
            todo={todo}
            setTodoEditing={setTodoEditing}
            setTodos={props.setTodos}
            todos={props.todos}
            classes={classes}
          />
        ) : (
          <TodoItem
            key={todo.id}
            todo={todo}
            classes={classes}
            updatetodo={props.updateTodo}
            setTodoEditing={setTodoEditing}
            onDelete={props.onDelete}
          />
        );
      })}
    </ul>
  );
};
export default CreateToDoList;
