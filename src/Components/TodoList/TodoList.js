import axios from "axios";
import React, { useReducer, useEffect, useContext, useState } from "react";
import Card from "../UI/Card";
import classes from "./Todolist.module.css";
import AddUserInput from "./AddUserInput";
import CreateToDoList from "./CreateToDoList";
import Header from "./Header";
import { AuthContext } from "../../App";
export const TodosContext = React.createContext();
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
const todosReducer = (state, action) => {
  switch (action.type) {
    case "TODOS/CREATE_TODOS": {
      console.log(action.payload);
      state = action.payload.map((todo) => {
        return {
          description: todo.description,
          _id: todo._id,
          completed: todo.completed,
          isEditing: false,
        };
      });
      return [...state];
    }
    case "TODOS/ADD_TODO": {
      return [
        ...state,
        {
          description: action.payload.description,
          _id: action.payload._id,
          completed: action.payload.completed,
          isEditing: false,
        },
      ];
    }
    case "TODOS/DELETE_TODO": {
      const updatedTodos = [...state].filter((todo) => {
        return todo._id !== action.payload._id;
      });

      return updatedTodos;
    }
    case "TODOS/COMPLETED_TODO": {
      console.log(state);
      const updatedTodos = [...state];
      updatedTodos.map((todo) => {
        if (todo._id === action.payload._id) {
          todo.completed = action.payload.completed;
        }
        return todo;
      });
      return updatedTodos;
    }
    case "TODOS/EDIT_TODO": {
      console.log(state);
      const updatedTodos = [...state];
      updatedTodos.map((todo) => {
        if (todo._id === action.payload) {
          return (todo.isEditing = true);
        }
        return todo;
      });
      return updatedTodos;
    }
    case "TODOS/CHANGE_DESCRIPTION": {
      const updatedTodos = [...state];
      updatedTodos.map((todo) => {
        if (todo._id === action.payload._id && action.payload.description) {
          todo.description = action.payload.description;
          todo.isEditing = false;
        }
        if (!action.payload.description) {
          todo.isEditing = false;
        }
        return todo;
      });

      return updatedTodos;
    }

    default:
      return state;
  }
};
function TodoList() {
  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [myTodos, todosDispatch] = useReducer(todosReducer, []);

  useEffect(() => {
    dispatch({
      type: "GET_USER",
    });
    axios
      .get(`${URL}/tasks`, {
        headers: { Authorization: `Bearer ${authState.token}` },
      })
      .then((response) => {
        dispatch({
          type: "USER_SUCCES",
          payload: response.data,
        });
        console.log(response.data);
        todosDispatch({
          type: "TODOS/CREATE_TODOS",
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: "USER_ERROR",
        });
        authDispatch({
          type: "LOGOUT",
        });
      });
  }, [authState.token]);
  const onFormSubmit = (inputValue) => {
    axios
      .post(
        `${URL}/tasks`,
        { description: inputValue, completed: false },
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      )
      .then((response) => {
        todosDispatch({
          type: "TODOS/ADD_TODO",
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteTodo = (id) => {
    axios
      .delete(`${URL}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${authState.token}` },
      })
      .then((response) => {
        todosDispatch({
          type: "TODOS/DELETE_TODO",
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const updateTodo = (todo) => {
    axios
      .patch(
        `${URL}/tasks/${todo._id}`,
        {
          completed: !todo.completed,
        },
        { headers: { Authorization: `Bearer ${authState.token}` } }
      )
      .then((response) => {
        todosDispatch({
          type: "TODOS/COMPLETED_TODO",
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const editTodo = (id) => {
    console.log(id);
    todosDispatch({
      type: "TODOS/EDIT_TODO",
      payload: id,
    });
  };
  return (
    <React.Fragment>
      <TodosContext.Provider
        value={{
          myTodos,
          todosDispatch,
        }}
      >
        <Header></Header>
        <Card className={classes.container}>
          <AddUserInput onFormSubmit={onFormSubmit} />
          <CreateToDoList
            updateTodo={updateTodo}
            onDelete={deleteTodo}
            editTodo={editTodo}
          />
        </Card>
      </TodosContext.Provider>
    </React.Fragment>
  );
}

export default TodoList;
