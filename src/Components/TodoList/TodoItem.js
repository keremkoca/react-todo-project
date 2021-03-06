import Button from "../UI/Button";
import Delete from "../UI/DeleteButton.module.css";
import Edit from "../UI/EditButton.module.css";
import Check from "../UI/CheckButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { TodosContext } from "./TodoList";
import { useContext } from "react";
const TodoItem = (props) => {
  const { myTodos, todosDispatch } = useContext(TodosContext);
  return (
    <li
      className={props.todo.completed ? props.classes.checked : null}
      id={props.todo._id}
      key={Math.random().toString()}
    >
      {props.todo.description}
      <Button className={Edit.button}>
        {
          <FontAwesomeIcon
            icon={faEdit}
            name="checkBtn"
            onClick={() => props.editTodo(props.todo._id)}
            id={props.todo.id}
          />
        }
      </Button>
      <Button type="button" className={Delete.button}>
        {
          <FontAwesomeIcon
            name="deleteBtn"
            onClick={() => props.onDelete(props.todo._id)}
            id={props.todo.id}
            icon={faTrashAlt}
          />
        }
      </Button>

      <Button className={Check.button}>
        {
          <FontAwesomeIcon
            name="checkBtn"
            onClick={() => props.updatetodo(props.todo)}
            id={props.todo.id}
            icon={faCheck}
          />
        }
      </Button>
    </li>
  );
};
export default TodoItem;
