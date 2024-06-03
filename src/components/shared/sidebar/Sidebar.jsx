import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CreateQuiz } from "../../../_root/pages";
import { AuthContext } from "../../../contexts/AuthContext";
import { useModal } from "../../../contexts/ModalContext";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const { toggleModal } = useModal();
  const { handleLogout } = React.useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const handleClicked = (link) => {
    navigate(link);
  };

  const handleCreateQuiz = () => {
    toggleModal(<CreateQuiz action='create' />);
  };
  const handleLogOut = async () => {
    const response = await handleLogout();
    if (response?.success) {
      navigate("/sign-in");
      toast.success(response?.message);
    }
  };
  return (
    <div className={styles.sidebar}>
      <div className={`${styles.jomhuriaRegular70}`}>QUIZZIE</div>
      <div className={styles.sidebarMenuWrapper}>
        <div
          className={`${styles.menuItem} ${
            location.pathname === "/" && styles.selectedMenuItem
          }`}
          onClick={() => handleClicked("/")}
        >
          Dashboard
        </div>
        <div
          className={`${styles.menuItem} ${
            location.pathname === "/quiz-analytics" && styles.selectedMenuItem
          }`}
          onClick={() => handleClicked("/quiz-analytics")}
        >
          Analytics
        </div>
        <div className={`${styles.menuItem}`} onClick={handleCreateQuiz}>
          Create Quiz
        </div>
      </div>
      <div className={styles.logoutBtn}>
        <button onClick={handleLogOut}>LOGOUT</button>
      </div>
    </div>
  );
};

export default Sidebar;
