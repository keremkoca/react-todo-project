import "./App.css";
import React from "react";
import { useReducer } from "react";
import TodoList from "./Components/TodoList/TodoList";
import Login from "./Components/Authentication/Login";
import CreateAccount from "./Components/Authentication/CreateAccount";
export const AuthContext = React.createContext();
const initialState = {
  isAuthenticated: false,
  isRegistering: false,
  user: null,
  token: null,
};
const reducer = (action, state) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", action.payload.user);
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        isRegistering: false,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "REGISTER":
      return {
        ...state,
        isAuthenticated: false,
        isRegistering: true,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: true,
        isRegistering: false,
        user: action.payload.user,
        token: action.payload.token,
      };
    default:
      return state;
  }
};
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <div className="App">
        {!state.isAuthenticated ? (
          <Login />
        ) : state.isRegistering ? (
          <CreateAccount />
        ) : (
          <TodoList></TodoList>
        )}
      </div>
    </AuthContext.Provider>
  );
}

export default App;
