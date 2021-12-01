import React, { useState, useEffect } from "react";
import Card from "../UI/Card";
import AddUserInput from "./AddUserInput";
import CreateToDoList from "./CreateToDoList";

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const _todos = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(_todos);
    !loadedTodos ? setTodos([]) : setTodos(loadedTodos);
  }, []);
  useEffect(() => {
    const _todos = JSON.stringify(todos);
    localStorage.setItem("todos", _todos);
  }, [todos]);

  const onFormSubmit = (inputValue) => {
    setTodos((prevState) => {
      return [
        ...prevState,
        {
          text: inputValue,
          id: Math.random().toString(),
          status: false,
          isEditing: false,
        },
      ];
    });
  };
  const deleteTodo = (id) => {
    setTodos((prev) => {
      return prev.filter((todo) => todo.id !== id);
    });
  };
  const updateTodo = (id) => {
    const updatedTodos = [...todos];
    updatedTodos.map((todo) => {
      if (todo.id === id) todo.status = !todo.status;
      return todo;
    });
    setTodos(updatedTodos);
  };
  const editTodo = (id) => {
    const updatedTodos = [...todos];
    updatedTodos.map((todo) => {
      if (todo.id === id) {
        todo.isEditing = !todo.isEditing;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };
  return (
    <React.Fragment>
      <div>
        <h2>REACT TODO APP</h2>
      </div>
      <Card>
        <AddUserInput onFormSubmit={onFormSubmit} />
        <CreateToDoList
          updateTodo={updateTodo}
          onDelete={deleteTodo}
          editTodo={editTodo}
          setTodos={setTodos}
          todos={todos}
        />
      </Card>
    </React.Fragment>
  );
}

export default TodoList;
