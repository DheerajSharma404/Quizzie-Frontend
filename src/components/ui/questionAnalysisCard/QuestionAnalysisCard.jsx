/* eslint-disable react/prop-types */
import styles from "./QuestionAnalysisCard.module.css";

const QuestionAnalysisCard = ({ question, quizType }) => {
  return (
    <>
      <div className={styles.question}>{question?.question}</div>
      <div className={styles.statsCardWrapper}>
        {quizType === "Q & A" &&
          ["Attempted", "Correct", "Incorrect"].map((type) => {
            return (
              <div key={type} className={styles.statsCard}>
                <div className={styles.cardCount}>
                  {type === "Attempted" && question?.attemptedCount}
                  {type === "Correct" && question?.correctlyAnsweredCount}
                  {type === "Incorrect" && question?.incorrectlyAnsweredCount}
                </div>
                <div className={styles.cardLabel}>
                  {type === "Attempted" && "people Attempted the question"}
                  {type === "Correct" && "people Answered Correctly"}
                  {type === "Incorrect" && "people Answered Incorrectly"}
                </div>
              </div>
            );
          })}
        {quizType === "Poll Type" &&
          question?.options?.map((option, index) => {
            return (
              <div
                key={option.id}
                className={`${styles.statsCard} ${styles.poll}`}
              >
                <div className={styles.cardCount}>{option?.selectedCount}</div>
                <div className={styles.cardLabel}>Option {index + 1}</div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default QuestionAnalysisCard;
