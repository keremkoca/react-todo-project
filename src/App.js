import "./App.css";
import { useState, useEffect } from "react";
import AddUserInput from "./Components/AddUserInput";
import Card from "./Components/UI/Card";
import CreateToDoList from "./Components/CreateToDoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");
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
    setTodos((prevState) => {
      let updatedTodos = [...prevState];
      updatedTodos = updatedTodos.filter((todo) => todo.id !== id);
      return updatedTodos;
    });
  };
  const updateTodo = (todoItem) => {
    todoItem.status = !todoItem.status;
    setTodos((prevState) => {
      const updatedTodos = [...prevState];
      return updatedTodos;
    });
  };
  const editHandler = (id) => {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id && editingText) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodoEditing(null);
    setEditingText("");
    return updatedTodos;
  };

  return (
    <div className="App">
      <div>
        <h2>REACT TODO APP</h2>
      </div>
      <Card>
        <AddUserInput onSubmit={onFormSubmit} />
        <CreateToDoList
          updateTodo={updateTodo}
          onDelete={deleteTodo}
          onEdit={setTodoEditing}
          submitEdit={editHandler}
          editId={todoEditing}
          getEditValue={setEditingText}
          editvalue={editingText}
          todos={todos}
        />
      </Card>
    </div>
  );
}

export default App;
