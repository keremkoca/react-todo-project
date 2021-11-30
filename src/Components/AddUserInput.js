import classes from "./AddUserInput.module.css";
import Button from "./UI/Button";
import submit from "./UI/SubmitButton.module.css";
import { useState } from "react";

const AddUserInput = (props) => {
  const [inputValue, setInputValue] = useState("");

  const onChangeInput = (event) => {
    setInputValue(event.target.value);
  };
  const onSubmitForm = (event) => {
    event.preventDefault();
    if (!inputValue) return;
    props.onFormSubmit(inputValue);
    setInputValue("");
  };

  return (
    <form onSubmit={onSubmitForm} className={classes.form}>
      <input type="text" onChange={onChangeInput} value={inputValue}></input>
      <Button className={submit.button} type="submit">
        Add ToDo
      </Button>
    </form>
  );
};
export default AddUserInput;
