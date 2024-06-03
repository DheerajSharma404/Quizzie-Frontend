import React from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import styles from "./AuthLayout.module.css";
const AuthLayout = () => {
  const { isAuthenticated, } = React.useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      {isAuthenticated &&  <Navigate to='/sign-in' />}
      <>
        <section className={styles.authlayoutWrapper}>
          <div className={`${styles.logoWrapper} ${styles.jomhuriaRegular100}`}>
            QUIZZIE
          </div>
          <div className={`${styles.buttonWrapper} `}>
            <button
              className={location.pathname === "/sign-up" && styles.selected}
              onClick={() => navigate("/sign-up")}
            >
              Sign Up{" "}
            </button>
            <button
              className={location.pathname === "/sign-in" && styles.selected}
              onClick={() => navigate("/sign-in")}
            >
              Log In
            </button>
          </div>
          <div className={`${styles.outletWrapper}`}>
            <Outlet />
          </div>
        </section>
      </>
    </>
  );
};

export default AuthLayout;
