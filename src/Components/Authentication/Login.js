import classes from "./Login.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import React from "react";
import { Link } from "react-router-dom";
import useForm from "./useForm";
const Login = (props) => {
  const {
    errors,
    values,
    handleLoginSubmit,
    handleFocus,
    handleBlur,
    handleChange,
  } = useForm();
  return (
    <div className={classes.wrapper}>
      <Card className={classes.Card}>
        <h2>Login</h2>
        <form onSubmit={handleLoginSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={values.email}
          ></input>
          {errors.email && (
            <div className={classes.error}> {errors.email} </div>
          )}
          <label htmlFor="password">Password</label>
          <input
            name="password"
            onChange={handleChange}
            value={values.password}
            onFocus={handleFocus}
            onBlur={handleBlur}
            type="password"
          ></input>
          {errors.password && (
            <div className={classes.error}> {errors.password} </div>
          )}
          <Button className={classes.button} type="submit">
            Login
          </Button>
          <Link className={classes.Link} to="/">
            Create an Account
          </Link>
        </form>
      </Card>
    </div>
  );
};
export default Login;
