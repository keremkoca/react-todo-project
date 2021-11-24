import classes from "./Login.module.css";
import Card from "./UI/Card";
import Button from "./UI/Button";
import React from "react";
import { Link } from "react-router-dom";
const Login = (props) => {
  return (
    <div className={classes.wrapper}>
      <Card className={classes.Card}>
        <h2>Login</h2>
        <form>
          <label htmlFor="email">Email</label>
          <input type="email"></input>
          <label htmlFor="password">Password</label>
          <input type="password"></input>
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
