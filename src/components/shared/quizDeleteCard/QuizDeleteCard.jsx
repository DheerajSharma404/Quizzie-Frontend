/* eslint-disable react/prop-types */
import { toast } from "sonner";
import { useModal } from "../../../contexts/ModalContext";
import { useQuiz } from "../../../contexts/QuizContext";
import styles from "./QuizDeleteCard.module.css";

const QuizDeleteCard = ({ quizId }) => {
  const { toggleModal } = useModal();
  const { handleDeleteQuiz } = useQuiz();
  const handleDelete = async () => {
    const response = await handleDeleteQuiz(quizId);
    if (response?.success) {
      toast.success(response?.message);
    }
    toggleModal();
  };
  return (
    <div className={styles.quizDeleteCardWrapper}>
      <div className={styles.quizDeleteCardText}>
        Are you confirm you want to delete?
      </div>
      <div className={styles.quizDeleteCardBtn}>
        <button className={styles.deleteBtn} onClick={handleDelete}>
          Confirm Delete
        </button>
        <button className={styles.cancelBtn} onClick={() => toggleModal()}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default QuizDeleteCard;
