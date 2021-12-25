import React, { useState } from "react";
import Classes from "./UserInfo.module.css";
function UserInfo(props) {
  const [userImg, setUserImg] = useState("");
  const onImgChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setUserImg(URL.createObjectURL(event.target.files[0]));
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
        <label>username={`${props.userInfo.name}`}</label>
        <label>email={props.userInfo.email}</label>
      </div>
    </div>
  );
}

export default UserInfo;
