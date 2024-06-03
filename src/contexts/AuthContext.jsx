/* eslint-disable react/prop-types */
import React from "react";
import { validateUser } from "../api/auth.js";

export const AuthContext = React.createContext();

// export const useAuth = () => {
//   return React.useContext(AuthContext);
// }

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(
    localStorage.getItem("x-access-token") ? true : false
  );

  const [user, setUser] = React.useState(null);

  const handleLogin = async (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };
  const fetchUser = async () => {
    const user = await validateUser();
    if (user?.success) {
      setUser(user?.data);
    } else {
      setIsAuthenticated(false);
    }
  };

  React.useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        fetchUser,
        setUser,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
