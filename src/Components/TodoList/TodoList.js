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
      const updatedTodos = [...prevState];
      updatedTodos.push({
        text: inputValue,
        id: Math.random().toString(),
        status: false,
      });
      return updatedTodos;
    });
  };
  const deleteTodo = (id) => {
    setTodos((prev) => {
      return prev.filter((todo) => todo.id !== id);
    });
  };
  const updateTodo = (todoItem) => {
    todoItem.status = !todoItem.status;
    setTodos([...todos]);
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
          setTodos={setTodos}
          todos={todos}
        />
      </Card>
    </React.Fragment>
  );
}

export default TodoList;
