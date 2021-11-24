import { useState } from "react";
import useValidateInfo from "./useValidateInfo";
const useForm = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { errors, handleValidation, handleErrors, handleSubmitValidation } =
    useValidateInfo(values);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitValidation(values);
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
    handleSubmit,
    handleFocus,
    handleBlur,
  };
};
export default useForm;
