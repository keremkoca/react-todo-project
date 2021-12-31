import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Classes from "./UserInfo.module.css";
import { AuthContext } from "../../../App";
const mainURL = "https://emircan-task-manager.herokuapp.com";

function UserInfo() {
  const { state: authstate } = useContext(AuthContext);
  const [userImg, setUserImg] = useState(null);
  useEffect(() => {
    onImgLoad();
  }, []);
  const onImgLoad = () => {
    axios
      .get(`${mainURL}/users/${authstate.userID}/avatar`, {
        headers: {
          Authorization: `Bearer ${authstate.token}`,
        },
      })
      .then((response) => {
        const _img = response.config.url;
        setUserImg(_img);
      });
  };
  const onImgChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const formdata = new FormData();
      formdata.append("avatar", event.target.files[0]);
      axios
        .post(`${mainURL}/users/me/avatar`, formdata, {
          headers: {
            Authorization: `Bearer ${authstate.token}`,
            "Content-Type": `multipart/form-data`,
          },
        })
        .then((response) => {
          setUserImg(URL.createObjectURL(event.target.files[0]));
        });
    }
  };
  return (
    <div className={Classes.container}>
      <div className={Classes.img}>
        <img alt={"pp"} src={userImg}></img>
        <label htmlFor={"files"}>Change PP</label>
        <input id={"files"} type="file" onChange={onImgChange}></input>
      </div>
      <div className={Classes.info}>
        <label>user {authstate.username}</label>
        <label>email {authstate.email}</label>
      </div>
    </div>
  );
}

export default UserInfo;
