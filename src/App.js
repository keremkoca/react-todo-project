import "./App.css";
import React from "react";
import { useReducer, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoList from "./Components/TodoList/TodoList";
import Login from "./Components/Authentication/Login";
import CreateAccount from "./Components/Authentication/CreateAccount";
export const AuthContext = React.createContext();
const initialState = {
  isAuthenticated: false,
  isRegistered: true,
  username: null,
  email: null,
  token: null,
  userID: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      console.log(action.payload.user);
      return {
        ...state,
        isAuthenticated: true,
        isRegistered: true,
        username: action.payload.user.name,
        email: action.payload.user.email,
        token: action.payload.token,
        userID: action.payload.user._id,
      };
    case "REGISTER":
      return {
        ...state,
        isAuthenticated: false,
        isRegistered: true,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
      };
    case "AUTHED":
      const userToken = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(state.token);
      if (userToken)
        return {
          ...state,
          isAuthenticated: true,
          username: user.name,
          email: user.email,
          token: userToken,
          userID: user._id,
        };
      else {
        return state;
      }

    default:
      return state;
  }
};
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    dispatch({
      type: "AUTHED",
    });
  }, [state.token]);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={!state.isAuthenticated ? <Login /> : <TodoList />}
            ></Route>
            <Route path="/register" element={<CreateAccount />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
