import classes from "./AddUserInput.module.css";
import Button from "../UI/Button";
import submit from "../UI/SubmitButton.module.css";
import { useContext, useRef } from "react";
import { TodosContext } from "./TodoList";

const AddUserInput = (props) => {
  const { myTodos, todosDispatch } = useContext(TodosContext);
  const inputValue = useRef("");

  const onSubmitForm = (event) => {
    event.preventDefault();
    if (!inputValue) return;
    props.onFormSubmit(inputValue.current.value);
    inputValue.current.value = "";
  };

  return (
    <form onSubmit={onSubmitForm} className={classes.form}>
      <input type="text" ref={inputValue}></input>
      <Button className={submit.button} type="submit">
        Add ToDo
      </Button>
    </form>
  );
};
export default AddUserInput;
