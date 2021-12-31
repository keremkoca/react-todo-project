import classes from "./CreateTodoList.module.css";
import EditTodoItem from "./EditTodoItem";
import TodoItem from "./TodoItem";
import React, { useContext } from "react";
import { TodosContext } from "./TodoList";

const CreateToDoList = (props) => {
  const { myTodos, todosDispatch } = useContext(TodosContext);
  return (
    <ul className={classes.ul}>
      {myTodos.map((todo) => {
        return todo.isEditing ? (
          <EditTodoItem
            key={todo._id}
            todos={props.todos}
            todo={todo}
            setTodos={props.setTodos}
            classes={classes}
          />
        ) : (
          <TodoItem
            key={todo._id}
            todo={todo}
            classes={classes}
            updatetodo={props.updateTodo}
            editTodo={props.editTodo}
            onDelete={props.onDelete}
          />
        );
      })}
    </ul>
  );
};
export default CreateToDoList;
