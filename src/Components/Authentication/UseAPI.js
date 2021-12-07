import React, { useState, useEffect } from "react";

function UseAPI(values) {
  const axios = require("axios");
  const URL = "https://emircan-task-manager.herokuapp.com";
  const createUser = (values) => {
    axios
      .post(`${URL}/users`, {
        name: values.username,
        email: values.email,
        password: values.password,
      })

      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const loginUser = (values) => {
    axios
      .post(`${URL}/users/login`, {
        email: values.email,
        password: values.password,
      })
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        console.log(values.password, values.email);
      });
  };

  return { createUser, loginUser };
}

export default UseAPI;
