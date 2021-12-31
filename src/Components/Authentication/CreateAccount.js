import classes from "./CreateAccount.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import useForm from "./useForm";
import { AuthContext } from "../../App";
import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const URL = "https://emircan-task-manager.herokuapp.com";

const initialState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  isSubmitting: false,
  errorMessage: null,
  successMessage: null,
};

const CreateAccount = () => {
  const { dispatch } = useContext(AuthContext);
  const [data, setData] = useState(initialState);
  const { errors, handleFocus, handleBlur } = useForm(data);
  const navigate = useNavigate();
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
        setData({
          ...data,
          isSubmitting: false,
          successMessage: "succesfuly created",
        });
        dispatch({
          type: "REGISTER",
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setData({
          ...data,
          errorMessage: error.message,
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
          {data.successMessage && (
            <div className={classes.success}> {data.successMessage} </div>
          )}
          <Button
            disabled={data.isSubmitting}
            className={classes.button}
            type="submit"
          >
            {!data.isSubmitting ? "Create Account" : "Loading..."}
          </Button>
        </form>
        <Link to="/">Already have an account?Sign in</Link>
      </Card>
    </div>
  );
};
export default CreateAccount;
