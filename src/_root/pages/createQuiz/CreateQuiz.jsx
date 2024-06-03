/* eslint-disable react/prop-types */

import { QuestionForm, QuizNameAndTypeCard } from "../../../components";

import styles from "./CreateQuiz.module.css";

const CreateQuiz = ({ action, quizId }) => {
  return (
    <div className={styles.createQuizWrapper}>
      {action === "create" && <QuizNameAndTypeCard />}
      {action === "edit" && <QuestionForm quizId={quizId} action={action} />}
    </div>
  );
};

export default CreateQuiz;
