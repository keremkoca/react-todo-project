import classes from "./EditTodoItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Edit from "../UI/EditButton.module.css";
import Button from "../UI/Button";
import { useContext, useState } from "react";
import axios from "axios";
import { TodosContext } from "./TodoList";
const URL = "https://emircan-task-manager.herokuapp.com";
const EditTodoItem = (props) => {
  const [editingText, setEditingText] = useState("");
  const { myTodos, todosDispatch } = useContext(TodosContext);
  const editHandler = (id) => {
    if (editingText && editingText !== props.todo.description) {
      const userToken = localStorage.getItem("token");
      axios
        .patch(
          `${URL}/tasks/${id}`,
          {
            description: editingText,
          },
          { headers: { Authorization: `Bearer ${userToken}` } }
        )
        .then((response) => {
          todosDispatch({
            type: "TODOS/CHANGE_DESCRIPTION",
            payload: response.data,
          });
        })
        .catch((error) => console.log(error));
    } else {
      const updatedTodos = [...props.todos];
      updatedTodos.map((todo) => {
        if (todo._id === props.todo._id) {
          return (todo.isEditing = false);
        }
        return todo;
      });
      props.setTodos(updatedTodos);
    }
  };
  return (
    <li
      className={`${props.todo.completed ? props.classes.checked : null} ${
        classes.li
      }`}
      id={props.todo.id}
      key={props.todo.id}
    >
      <input
        type="text"
        onChange={(event) => setEditingText(event.target.value)}
        value={editingText}
      ></input>
      <Button className={Edit.button}>
        {
          <FontAwesomeIcon
            icon={faEdit}
            name="checkBtn"
            onClick={() => editHandler(props.todo._id)}
            id={props.todo._id}
          />
        }
      </Button>
    </li>
  );
};
export default EditTodoItem;
