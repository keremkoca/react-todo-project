import axios from "axios";
import React, { useReducer, useEffect, useContext, useState } from "react";
import Card from "../UI/Card";
import AddUserInput from "./AddUserInput";
import CreateToDoList from "./CreateToDoList";
import UserInfo from "./UserInfo/UserInfo";
import { AuthContext } from "../../App";
const URL = "https://emircan-task-manager.herokuapp.com";
const initialState = {
  todos: [],
  isFetching: false,
  hasError: false,
};
const reducer = (action, state) => {
  switch (action.type) {
    //Authentication
    case "GET_USER":
      return {
        ...state,
        isFetching: true,
        hasError: false,
      };
    case "GET_USER_SUCCES":
      return {
        ...state,
        isFetching: false,
        hasError: false,
        todos: action.payload,
      };
    case "GET_USER_ERROR":
      return {
        ...state,
        isFetching: false,
        hasError: true,
      };
    //

    default:
      return state;
  }
};

function TodoList() {
  const { state: authState } = useContext(AuthContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    dispatch({
      type: "GET_USER",
    });
    axios
      .get(`${URL}/tasks`, {
        headers: { Authorization: `Bearer ${authState.token}` },
      })
      .then((response) => {
        console.log(response.data);
        dispatch({
          type: "USER_SUCCES",
          payload: response.data,
        });
        setTodos([...response.data]);
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: "USER_ERROR",
        });
      });
  }, [authState.token]);
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
  console.log(todos);
  console.log(state);
  return (
    <React.Fragment>
      <div>
        <h2>REACT TODO APP</h2>
      </div>
      <Card>
        <UserInfo
          email={authState.email}
          username={authState.username}
        ></UserInfo>
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
