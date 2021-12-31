import classes from "./Login.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import React from "react";
import useForm from "./useForm";
import { AuthContext } from "../../App";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const URL = "https://emircan-task-manager.herokuapp.com";
const initialState = {
  email: "",
  password: "",
  isSubmitting: false,
  errorMessage: null,
};
const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const [data, setData] = useState(initialState);
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
      .post(`${URL}/users/login`, {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        setData({
          ...data,
          isSubmitting: false,
        });
        dispatch({
          type: "LOGIN",
          payload: response.data,
        });
      })
      .catch((error) => {
        setData({
          ...data,
          errorMessage: error.message || error.statusText,
        });
      });
  };
  const { errors, handleFocus, handleBlur } = useForm(data);
  return (
    <div className={classes.wrapper}>
      <Card className={classes.Card}>
        <h2>Login</h2>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={data.email}
          ></input>
          {errors.email && (
            <div className={classes.error}> {errors.email} </div>
          )}
          <label htmlFor="password">Password</label>
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
          {data.errorMessage && (
            <div className={classes.error}> {data.errorMessage} </div>
          )}
          <Button
            disabled={data.isSubmitting}
            className={classes.button}
            type="submit"
          >
            {data.isSubmitting ? "...Loading" : "Login"}
          </Button>
        </form>
        <Link to="/register">Dont have account?Sign up</Link>
      </Card>
    </div>
  );
};
export default Login;
