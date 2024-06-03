import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { signUpUser } from "../../../api/auth";
import { UserValidation } from "../../../validators";
import styles from "./SignUpForm.module.css";
const SignUpForm = () => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = React.useState(null);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation =
      UserValidation.userSignUpValidationSchema.safeParse(formData);

    if (!validation.success) {
      const error = validation.error;
      let newError = {};
      for (const issue of error.issues) {
        newError = { ...newError, [issue.path[0]]: issue.message };
      }
      return setFormErrors(newError);
    }

    const response = await signUpUser(formData);
    if (response?.success) {
      navigate("/sign-in");
      toast.success(response?.message);
    } else {
      toast.error(response?.error?.explanation);
    }
  };

  const handleResetError = () => {
    setFormErrors(null);
  };
  return (
    <>
      <form className={styles.formWrapper} onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <div className={styles.labelWrapper}>
            <label htmlFor='name'>Name</label>
          </div>
          {formErrors?.name ? (
            <div onClick={handleResetError} className={styles.formErrors}>
              {formErrors?.name}
            </div>
          ) : (
            <input
              type='text'
              id='name'
              value={formData.name}
              required
              onChange={handleChange}
            />
          )}
        </div>
        <div className={styles.inputWrapper}>
          <div className={styles.labelWrapper}>
            <label htmlFor='Email'>Email</label>
          </div>
          {formErrors?.email ? (
            <div onClick={handleResetError} className={styles.formErrors}>
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
            <div onClick={handleResetError} className={styles.formErrors}>
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
        <div className={styles.inputWrapper}>
          <div className={styles.labelWrapper}>
            <label htmlFor='confirmPassword'>Confirm Password</label>
          </div>
          {formErrors?.confirmPassword ? (
            <div onClick={handleResetError} className={styles.formErrors}>
              {formErrors?.confirmPassword}
            </div>
          ) : (
            <input
              type='password'
              id='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          )}
        </div>
        <button className={styles.submitBtn} type='submit'>
          Sign Up
        </button>
      </form>
    </>
  );
};

export default SignUpForm;
