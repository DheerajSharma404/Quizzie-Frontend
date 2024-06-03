/* eslint-disable react/prop-types */
import { formatDate } from "../../../utils";
import styles from "./QuizCard.module.css";
const QuizCard = ({ quiz }) => {
  return (
    <div className={styles.quizCard}>
      <div className={styles.quizTitleWrapper}>
        <p>{quiz.quizName}</p>
        <div className={styles.stat}>
          {quiz?.impressionCount}
          <img src='/assets/icons/impression.svg' alt='' />
        </div>
      </div>
      <div className={styles.quizTimestamp}>
        <p>{`Created on : ${formatDate(quiz?.createdAt)}`}</p>
      </div>
    </div>
  );
};

export default QuizCard;
