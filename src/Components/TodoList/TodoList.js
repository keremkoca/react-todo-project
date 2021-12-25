import axios from "axios";
import React, { useState, useEffect } from "react";
import Card from "../UI/Card";
import AddUserInput from "./AddUserInput";
import CreateToDoList from "./CreateToDoList";
import UserInfo from "./UserInfo/UserInfo";
const URL = "https://emircan-task-manager.herokuapp.com";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [userInfo, setUserInfo] = useState("");
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    console.log(userToken);
    axios
      .get(`${URL}/users/me`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then(function (response) {
        setUserInfo(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    axios
      .get(`${URL}/tasks`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then(function (response) {
        setTodos(() => {
          return [...response.data];
        });
        setTodos((todos) => {
          todos.map((todo) => (todo.isEditing = false));
          console.log(todos);
          return todos;
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);
  // useEffect(() => {
  //   const _todos = localStorage.getItem("todos");
  //   const loadedTodos = JSON.parse(_todos);
  //   !loadedTodos ? setTodos([]) : setTodos(loadedTodos);
  // }, []);
  // useEffect(() => {
  //   const _todos = JSON.stringify(todos);
  //   localStorage.setItem("todos", _todos);
  // }, [todos]);
  const onFormSubmit = (inputValue) => {
    const userToken = localStorage.getItem("userToken");
    axios
      .post(
        `${URL}/tasks`,
        { description: inputValue, completed: false },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((response) => {
        response.isEditing = false;
        setTodos((prev) => {
          return [...prev, response.data];
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteTodo = (id) => {
    const userToken = localStorage.getItem("userToken");
    axios
      .delete(`${URL}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((response) => {
        const updatedTodos = [...todos].filter((todo) => {
          return todo._id !== response.data._id;
        });
        setTodos(updatedTodos);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const updateTodo = (todo) => {
    const userToken = localStorage.getItem("userToken");
    axios
      .patch(
        `${URL}/tasks/${todo._id}`,
        {
          completed: !todo.completed,
        },
        { headers: { Authorization: `Bearer ${userToken}` } }
      )
      .then((response) => {
        const updatedTodos = [...todos];
        updatedTodos.map((todo) => {
          if (todo._id === response.data._id) {
            todo.completed = response.data.completed;
          }
          return todo;
        });
        setTodos(updatedTodos);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const editTodo = (id) => {
    const updatedTodos = [...todos];
    updatedTodos.map((todo) => {
      if (todo._id === id) {
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
        <UserInfo userInfo={userInfo}></UserInfo>
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
