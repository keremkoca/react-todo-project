import Button from "../UI/Button";
import Delete from "../UI/DeleteButton.module.css";
import Edit from "../UI/EditButton.module.css";
import Check from "../UI/CheckButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
const TodoItem = (props) => {
  const editTodo = (todo) => {
    todo.isEditing = !todo.isEditing;
    props.setTodos((prev) => [...prev]);
  };
  return (
    <li
      className={props.todo.status ? props.classes.checked : null}
      id={props.todo.id}
      key={Math.random().toString()}
    >
      {props.todo.text}
      <Button className={Edit.button}>
        {
          <FontAwesomeIcon
            icon={faEdit}
            name="checkBtn"
            onClick={() => editTodo(props.todo)}
            id={props.todo.id}
          />
        }
      </Button>
      <Button type="button" className={Delete.button}>
        {
          <FontAwesomeIcon
            name="deleteBtn"
            onClick={() => props.onDelete(props.todo.id)}
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
