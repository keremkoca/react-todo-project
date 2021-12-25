import "./App.css";
import React from "react";
import { useReducer } from "react";
import TodoList from "./Components/TodoList/TodoList";
import Login from "./Components/Authentication/Login";
import CreateAccount from "./Components/Authentication/CreateAccount";
export const AuthContext = React.createContext();
const initialState = {
  isAuthenticated: false,
  isRegistered: true,
  hasAccount: true,
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
        isRegistered: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGIN TO REGISTER":
      return {
        ...state,
        isAuthenticated: false,
        isRegistered: false,
        hasAccount: false,
      };
    case "REGISTER TO LOGIN":
      return {
        ...state,
        isAuthenticated: false,
        isRegistered: true,
        hasAccount: true,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: true,
        isRegistered: true,
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
        {!state.isAuthenticated && state.hasAccount ? (
          <Login />
        ) : !state.hasAccount && !state.isRegistered ? (
          <CreateAccount />
        ) : (
          <TodoList></TodoList>
        )}
      </div>
    </AuthContext.Provider>
  );
}

export default App;
