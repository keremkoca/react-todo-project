import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TodoList from "./Components/TodoList";
import Login from "./Components/Login";
import CreateAccount from "./Components/CreateAccount";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<CreateAccount></CreateAccount>} path="/"></Route>
        <Route element={<Login />} path="/login"></Route>
        <Route
          element={
            <div className="App">
              <TodoList />
            </div>
          }
          path="/todolist"
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
