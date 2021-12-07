import { useState } from "react";
import UseAPI from "./UseAPI";
import useValidateInfo from "./useValidateInfo";
const useForm = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const {
    errors,
    isSubmitting,
    handleValidation,
    handleErrors,
    handleRegisterSubmitValidation,
    handleLoginSubmitValidation,
  } = useValidateInfo(values);
  const { createUser, loginUser } = UseAPI(values);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    handleRegisterSubmitValidation(values);
    if (isSubmitting) {
      createUser(values);
    }
  };
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    handleLoginSubmitValidation(values);
    if (isSubmitting) {
      loginUser(values);
    }
  };
  const handleFocus = (event) => {
    const name = event.target.name;

    handleValidation(name);
    handleErrors(name);
  };
  const handleBlur = (e) => {
    const name = e.target.name;

    handleValidation(name);
  };
  return {
    errors,
    values,
    handleChange,
    handleRegisterSubmit,
    handleLoginSubmit,
    handleFocus,
    handleBlur,
  };
};
export default useForm;
