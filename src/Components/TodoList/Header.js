import React, { useContext } from "react";
import classes from "./Header.module.css";
import Button from "../UI/Button";
import { AuthContext } from "../../App";
import UserInfo from "./UserInfo/UserInfo";
import axios from "axios";
const URL = "https://emircan-task-manager.herokuapp.com";

function Header() {
  const { state, dispatch } = useContext(AuthContext);
  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    // axios
    //   .post(`${URL}/users/logout`, {
    //     headers: {
    //       Authorization: `Bearer ${state.token}`,
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response);
    //     dispatch({
    //       type: "LOGOUT",
    //     });
    //   });
  };
  return (
    <nav className={classes.navigation}>
      <UserInfo></UserInfo>
      <h1>TODOLIST</h1>
      <Button onClick={handleLogout}>LOGOUT</Button>
    </nav>
  );
}

export default Header;
