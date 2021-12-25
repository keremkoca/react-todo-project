import useValidateInfo from "./useValidateInfo";
const useForm = (data) => {
  const { errors, handleValidation, handleErrors } = useValidateInfo(data);
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
    handleFocus,
    handleBlur,
  };
};
export default useForm;
