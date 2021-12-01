import classes from "./EditTodoItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Edit from "../UI/EditButton.module.css";
import Button from "../UI/Button";
import { useState } from "react";
const EditTodoItem = (props) => {
  const [editingText, setEditingText] = useState("");
  const editHandler = () => {
    if (editingText) {
      props.todo.text = editingText;
      props.setTodos((prev) => [...prev]);
    } else {
      props.todo.isEditing = false;
      props.setTodos((prev) => [...prev]);
    }
    /* const updatedTodos = [...props.todos].map((todo) => {
      setEditingText(todo.text);
      if (todo.id === id && editingText) {
        todo.text = editingText;
      }
      console.log(todo);
      return todo;
      });
      */
    props.todo.isEditing = false;

    // props.setTodos(updatedTodos);
    //console.log(updatedTodos);
  };
  return (
    <li
      className={`${props.todo.status ? props.classes.checked : null} ${
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
            onClick={editHandler}
            id={props.todo.id}
          />
        }
      </Button>
    </li>
  );
};
export default EditTodoItem;
