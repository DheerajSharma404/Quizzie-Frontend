import { Outlet } from "react-router-dom";
import { Modal, Sidebar } from "../components";
import { useModal } from "../contexts/ModalContext";
import styles from "./RootLayout.module.css";
const RootLayout = () => {
  const { isModalOpen, ModalContent } = useModal();
  return (
    <div className={styles.rootLayout}>
      {/* sidebar */}
      <div className={styles.sidebarWrapper}>
        <Sidebar />
      </div>
      {/* main content outlet */}
      <div className={styles.contentWrapper}>
        <Outlet />
      </div>
      {isModalOpen && <Modal>{ModalContent}</Modal>}
    </div>
  );
};

export default RootLayout;
