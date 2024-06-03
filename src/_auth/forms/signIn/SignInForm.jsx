import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { signInUser } from "../../../api/auth";
import { AuthContext } from "../../../contexts/AuthContext";
import { UserValidation } from "../../../validators";
import styles from "./SignInForm.module.css";

const SignInForm = () => {
  const navigate = useNavigate();
  const { handleLogin } = React.useContext(AuthContext);
  const [formErrors, setFormErrors] = React.useState(null);
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleClick = () => {
    setFormErrors(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation =
      UserValidation.userSignInValidationSchema.safeParse(formData);
    if (!validation.success) {
      const error = validation.error;
      let newError = {};
      for (const issue of error.issues) {
        newError = {
          ...newError,
          [issue.path[0]]: issue.message,
        };
      }
      return setFormErrors(newError);
    }
    // If validation is successful, send a request to the backend
    const response = await signInUser(formData);
    if (response?.success) {
      // Handle successful registration (e.g., navigate to another page)
      handleLogin(response?.data);
      navigate("/");
      toast.success(response?.message);
    } else {
      toast.error(response?.error?.explanation);
    }
    setFormErrors({});
  };
  return (
    <>
      <form className={styles.formWrapper} onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <div className={styles.labelWrapper}>
            <label htmlFor='Email'>Email</label>
          </div>
          {formErrors?.email ? (
            <div onClick={handleClick} className={styles.formErrors}>
              {formErrors?.email}
            </div>
          ) : (
            <input
              type='text'
              id='email'
              value={formData.email}
              onChange={handleChange}
              required
            />
          )}
        </div>
        <div className={styles.inputWrapper}>
          <div className={styles.labelWrapper}>
            <label htmlFor='password'>Password</label>
          </div>
          {formErrors?.password ? (
            <div onClick={handleClick} className={styles.formErrors}>
              {formErrors?.password}
            </div>
          ) : (
            <input
              type='password'
              id='password'
              value={formData.password}
              onChange={handleChange}
              required
            />
          )}
        </div>

        <button className={styles.submitBtn} type='submit'>
          Log In
        </button>
      </form>
    </>
  );
};

export default SignInForm;
