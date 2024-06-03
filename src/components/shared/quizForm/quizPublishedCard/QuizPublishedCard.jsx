/* eslint-disable react/prop-types */
import { toast } from "sonner";
import { useModal } from "../../../../contexts/ModalContext";
import styles from "./QuizPublishedCard.module.css";
const QuestionPublishedCard = ({ quizId }) => {
  const { toggleModal } = useModal();
  const handleShare = () => {
    //copy the link to the clipboard
    navigator.clipboard.writeText(
      `https://quizzie-ds.vercel.app/live-quiz/${quizId}`
    );
    toast.success("Link copied to clipboard");
  };
  return (
    <div className={styles.QuestionPublishedCardWrapper}>
      <p className={styles.greetingText}>Congrats your Quiz is Published!</p>
      <div
        className={styles.shareableLinkDisplay}
      >{`https://quizzie-ds.vercel.app/live-quiz/${quizId}`}</div>
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
