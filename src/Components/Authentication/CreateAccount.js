import classes from "./CreateAccount.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import useForm from "./useForm";
import { AuthContext } from "../../App";
import { useContext, useState } from "react";
import axios from "axios";
const URL = "https://emircan-task-manager.herokuapp.com";

const initialState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  isSubmitting: false,
  errorMessage: null,
};

const CreateAccount = () => {
  const { dispatch } = useContext(AuthContext);
  const [data, setData] = useState(initialState);
  const { errors, handleFocus, handleBlur } = useForm(data);

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    });
    axios
      .post(`${URL}/users`, {
        name: data.username,
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        dispatch({
          type: "REGISTER TO LOGIN",
        });
      });
  };

  return (
    <div className={classes.wrapper}>
      <Card className={classes.Card}>
        <h2>Create Account</h2>
        <form onSubmit={handleFormSubmit}>
          <label>Username</label>
          <input
            name="username"
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={data.username}
            type="text"
          ></input>
          {errors.username && (
            <div className={classes.error}> {errors.username} </div>
          )}
          <label>Email</label>
          <input
            name="email"
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={data.email}
            type="email"
          ></input>
          {errors.email && (
            <div className={classes.error}> {errors.email} </div>
          )}
          <label>Password</label>
          <input
            name="password"
            onChange={handleInputChange}
            value={data.password}
            onFocus={handleFocus}
            onBlur={handleBlur}
            type="password"
          ></input>
          {errors.password && (
            <div className={classes.error}> {errors.password} </div>
          )}
          <label>Confirm Password</label>
          <input
            name="confirmPassword"
            onChange={handleInputChange}
            value={data.confirmPassword}
            onFocus={handleFocus}
            onBlur={handleBlur}
            type="password"
          ></input>
          {errors.confirmPassword && (
            <div className={classes.error}> {errors.confirmPassword} </div>
          )}
          <Button
            disabled={data.isSubmitting}
            className={classes.button}
            type="submit"
          >
            {!data.isSubmitting ? "Create Account" : "Loading..."}
          </Button>
          <span
            onClick={() => {
              dispatch({
                type: "REGISTER TO LOGIN",
              });
            }}
          >
            Already have an account?
          </span>
        </form>
      </Card>
    </div>
  );
};
export default CreateAccount;
