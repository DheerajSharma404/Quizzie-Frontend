/* eslint-disable react/prop-types */

import styles from "./Modal.module.css";

const Modal = ({ children }) => {
  return (
    <div className={styles.modalOverlay}>
      {children}
    </div>
  );
};

export default Modal;
