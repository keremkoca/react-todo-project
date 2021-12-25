import { useState } from "react";

const useValidateInfo = (values) => {
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleRegisterSubmitValidation = (values) => {
    if (!values.username) {
      setErrors((err) => {
        return { ...err, username: "*required" };
      });
    }
    if (!values.email) {
      setErrors((err) => {
        return { ...err, email: "*required" };
      });
    }
    if (!values.password) {
      setErrors((err) => {
        return { ...err, password: "*required" };
      });
    }
    if (!values.confirmPassword) {
      setErrors((err) => {
        return { ...err, confirmPassword: "*required" };
      });
    }
  };
  const handleLoginSubmitValidation = (values) => {
    if (!values.email) {
      setErrors((err) => {
        return { ...err, email: "*required" };
      });
    }
    if (!values.password) {
      setErrors((err) => {
        return { ...err, password: "*required" };
      });
    }
  };
  const handleValidation = (name) => {
    //Username
    if (name === "username") {
      if (!values.username) {
        setErrors({ [name]: "*required" });
      }
    }

    //Email
    if (name === "email") {
      if (!values.email) {
        setErrors({ [name]: "*required" });
      } else if (!values.email.includes("@")) {
        setErrors({ [name]: "*invalid email" });
      }
    }
    //Password
    if (name === "password") {
      if (!values.password) {
        setErrors({ [name]: "required" });
      }
      if (
        values.confirmPassword &&
        values.password !== values.confirmPassword
      ) {
        setErrors({ [name]: "passwords do not match" });
      }
    }
    if (name === "confirmPassword") {
      if (!values.confirmPassword) {
        //ConfirmPassword
        setErrors({ [name]: "confirm is required" });
      }
      if (values.password !== values.confirmPassword) {
        setErrors({ [name]: "passwords do not match" });
      }
    }
  };
  const handleErrors = (name) => {
    setErrors({ ...errors, [name]: "" });
  };
  return {
    errors,
    handleValidation,
    handleErrors,
    handleRegisterSubmitValidation,
    handleLoginSubmitValidation,
  };
};

export default useValidateInfo;
