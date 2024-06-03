/* eslint-disable react/prop-types */
import { toast } from "sonner";
import { useModal } from "../../../../contexts/ModalContext";

import styles from "./QuizPublishedCard.module.css";
//todo: add the close modal functionality
//todo: add the share functionality
//todo: add the link to share
//
const QuestionPublishedCard = ({ quizId }) => {
  const { toggleModal } = useModal();
  const handleShare = () => {
    //copy the link to the clipboard
    navigator.clipboard.writeText(`http://localhost:5173/live-quiz/${quizId}`);
    toast.success("Link copied to clipboard");
  };
  return (
    <div className={styles.QuestionPublishedCardWrapper}>
      <p className={styles.greetingText}>Congrats your Quiz is Published!</p>
      <div
        className={styles.shareableLinkDisplay}
      >{`http://localhost:5173/live-quiz/${quizId}`}</div>
      <button className={styles.shareBtn} onClick={handleShare}>
        Share
      </button>
      <img
        src='/assets/icons/big-cross.svg'
        alt='close Modal icon'
        className={styles.closeModalIcon}
        onClick={() => toggleModal()}
      />
    </div>
  );
};

export default QuestionPublishedCard;
