import { useState } from "react";

const useValidateInfo = (data) => {
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleRegisterSubmitValidation = (data) => {
    if (!data.username) {
      setErrors((err) => {
        return { ...err, username: "*required" };
      });
    }
    if (!data.email) {
      setErrors((err) => {
        return { ...err, email: "*required" };
      });
    }
    if (!data.password) {
      setErrors((err) => {
        return { ...err, password: "*required" };
      });
    }
    if (!data.confirmPassword) {
      setErrors((err) => {
        return { ...err, confirmPassword: "*required" };
      });
    }
  };
  const handleLoginSubmitValidation = (data) => {
    if (!data.email) {
      setErrors((err) => {
        return { ...err, email: "*required" };
      });
    }
    if (!data.password) {
      setErrors((err) => {
        return { ...err, password: "*required" };
      });
    }
  };
  const handleValidation = (name) => {
    //Username
    if (name === "username") {
      if (!data.username) {
        setErrors({ [name]: "*required" });
      }
    }

    //Email
    if (name === "email") {
      if (!data.email) {
        setErrors({ [name]: "*required" });
      } else if (!data.email.includes("@")) {
        setErrors({ [name]: "*invalid email" });
      }
    }
    //Password
    if (name === "password") {
      if (!data.password) {
        setErrors({ [name]: "required" });
      }
      if (data.confirmPassword && data.password !== data.confirmPassword) {
        setErrors({ [name]: "passwords do not match" });
      }
    }
    if (name === "confirmPassword") {
      if (!data.confirmPassword) {
        //ConfirmPassword
        setErrors({ [name]: "confirm is required" });
      }
      if (data.password !== data.confirmPassword) {
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
