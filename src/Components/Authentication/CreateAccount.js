import classes from "./CreateAccount.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import { Link } from "react-router-dom";
import useForm from "./useForm";

const CreateAccount = (props) => {
  const {
    errors,
    values,
    handleRegisterSubmit,
    handleFocus,
    handleBlur,
    handleChange,
  } = useForm();

  return (
    <div className={classes.wrapper}>
      <Card className={classes.Card}>
        <h2>Create Account</h2>
        <form onSubmit={handleRegisterSubmit}>
          <label>Username</label>
          <input
            name="username"
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={values.username}
            type="text"
          ></input>
          {errors.username && (
            <div className={classes.error}> {errors.username} </div>
          )}
          <label>Email</label>
          <input
            name="email"
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={values.email}
            type="email"
          ></input>
          {errors.email && (
            <div className={classes.error}> {errors.email} </div>
          )}
          <label>Password</label>
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
          <label>Confirm Password</label>
          <input
            name="confirmPassword"
            onChange={handleChange}
            value={values.confirmPassword}
            onFocus={handleFocus}
            onBlur={handleBlur}
            type="password"
          ></input>
          {errors.confirmPassword && (
            <div className={classes.error}> {errors.confirmPassword} </div>
          )}
          <Button className={classes.button} type="submit">
            Create Account
          </Button>
          <Link className={classes.Link} to="/Login">
            Already have an account?
          </Link>
        </form>
      </Card>
    </div>
  );
};
export default CreateAccount;
