import React from "react";
import { useParams } from "react-router-dom";
import { Divider, QuestionAnalysisCard } from "../../../components";
import { useQuiz } from "../../../contexts/QuizContext";
import { formatCount, formatDate } from "../../../utils";
import styles from "./QuestionAnalysis.module.css";

const QuestionAnalysis = () => {
  const { quizId } = useParams();

  const { quizzes: Quizzes, fetchAllQuizess } = useQuiz();
  const quiz = Quizzes.find((quiz) => quiz?._id === quizId);
  React.useEffect(() => {
    fetchAllQuizess();
  }, []);
  return (
    <div className={styles.questionAnalysisWrapper}>
      <div className={styles.questionAnalysisHeadingWrapper}>
        <div
          className={styles.heading}
        >{`${quiz?.quizName} Question Analysis`}</div>
        <div className={styles.timestampWrapper}>
          <p>{`Created on : ${formatDate(quiz?.createdAt)}`}</p>
          <p>{`Impression : ${formatCount(quiz?.impressionCount)} `}</p>
        </div>
      </div>
      <div className={styles.questionWrapper}>
        {quiz?.questions?.map((question, index) => (
          <div key={index} className={styles.question}>
            <QuestionAnalysisCard
              question={question}
              quizType={quiz?.quizType}
            />
            {index !== quiz?.questions.length - 1 && <Divider />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionAnalysis;
