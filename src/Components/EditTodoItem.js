import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Edit from "./UI/EditButton.module.css";
import Button from "./UI/Button";
const EditTodoItem = (props) => {
  return (
    <li
      className={props.todo.status ? props.classes.checked : null}
      id={props.todo.id}
      key={props.todo.id}
      isediting={props.isediting}
    >
      <input
        type="text"
        onChange={(event) => props.getId(event.target.value)}
        value={props.editvalue}
      ></input>
      <Button className={Edit.button}>
        {
          <FontAwesomeIcon
            icon={faEdit}
            name="checkBtn"
            onClick={() => props.onSubmit(props.todo.id)}
            id={props.todo.id}
          />
        }
      </Button>
    </li>
  );
};
export default EditTodoItem;
