/* eslint-disable react/prop-types */
import React from "react";

const ModalContext = React.createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useModal = () => {
  return React.useContext(ModalContext);
};

const ModalContextProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [ModalContent, setModalContent] = React.useState(null);

  const toggleModal = (content) => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) {
      document.body.classList.add("noScroll");
    } else {
      document.body.classList.remove("noScroll");
    }
    setModalContent(content);
  };

  const changeModalContent = (content) => {
    setModalContent(content);
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        toggleModal,
        ModalContent,
        changeModalContent,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
