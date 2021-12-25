import { useState, useEffect } from "react";
function UseAPI() {
  const [responses, setResponse] = useState("");
  const [userToken, setUserToken] = useState("");
  const axios = require("axios");
  const URL = "https://emircan-task-manager.herokuapp.com";
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    !token ? setUserToken("") : setUserToken(token);
  }, []);
  useEffect(() => {
    localStorage.setItem("userToken", userToken);
  }, [userToken]);

  const navigatePage = (token) => {
    if (token) {
      navigate("/todolist");
    }
  };
  const createUser = (values) => {
    axios
      .post(`${URL}/users`, {
        name: values.username,
        email: values.email,
        password: values.password,
      })

      .then(function (response) {
        setResponse(response);
        if (responses) {
          navigate("/login");
        }
      })
      .catch(function (error) {
        console.log(error);
        console.log(error.status);
      });
  };
  const loginUser = (values) => {
    axios
      .post(`${URL}/users/login`, {
        email: values.email,
        password: values.password,
      })
      .then(function (response) {
        const responseToken = response.data.token;
        setResponse(response);
        setUserToken(responseToken);
      })

      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {});
  };
  console.log(userToken);
  return { userToken, responses, createUser, loginUser };
}

export default UseAPI;
