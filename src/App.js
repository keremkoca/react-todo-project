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
  username: null,
  email: null,
  token: null,
};
const reducer = (action, state) => {
  console.log("object");
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      console.log("object1");
      return {
        ...state,
        isAuthenticated: true,
        isRegistered: true,
        username: action.payload.user.name,
        email: action.payload.user.email,
        token: action.payload.token,
      };
    case "LOGIN_TO_REGISTER":
      return {
        ...state,
        isAuthenticated: false,
        isRegistered: false,
        hasAccount: false,
      };
    case "REGISTER_TO_LOGIN":
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
      console.log(state);
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
        {!state.isAuthenticated ? <Login /> : <TodoList />}
      </div>
    </AuthContext.Provider>
  );
}

export default App;
