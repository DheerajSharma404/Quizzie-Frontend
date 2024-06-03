import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { QuizDeleteCard } from "../../../components";
import { useModal } from "../../../contexts/ModalContext";
import { useQuiz } from "../../../contexts/QuizContext";
import { formatCount, formatDate } from "../../../utils";
import { CreateQuiz } from "../index";
import styles from "./QuizAnalytics.module.css";
const QuizAnalytics = () => {
  const { quizzes: Quizzes, fetchAllQuizess } = useQuiz();
  const navigate = useNavigate();
  const { toggleModal } = useModal();
  const handleEditQuiz = (quizId) => {
    toggleModal(<CreateQuiz action='edit' quizId={quizId} />);
  };
  const handleDeleteQuiz = (quizId) => {
    toggleModal(<QuizDeleteCard quizId={quizId} />);
  };
  const handleShareQuiz = (quizId) => {
    //copy to clipboard
    navigator.clipboard.writeText(
      `${window.location.origin}/live-quiz/${quizId}`
    );
    toast.success("Link copied to clipboard");
  };
  const handleQuestionwiseAnalysis = (quizId) => {
    navigate(`/question-analysis/${quizId}`);
  };
  React.useEffect(() => {
    fetchAllQuizess();
  }, []);

  return (
    <div className={styles.quizAnalysisWrapper}>
      <h2>Quiz Analysis</h2>
      <table className={styles.table}>
        <thead className={styles.tableheading}>
          <tr className={styles.tablerow}>
            <th id='first'>S.No</th>
            <th>Quiz Name</th>
            <th>Created on</th>
            <th>Impression</th>
            <th></th>
            <th id='last'></th>
          </tr>
        </thead>
        <tbody>
          {Quizzes?.map((quiz, index) => (
            <tr key={index}>
              <td id='first'>{index + 1}</td>
              <td>{quiz?.quizName}</td>
              <td>{formatDate(quiz?.createdAt)}</td>
              <td>{formatCount(quiz?.impressionCount)}</td>
              <td>
                <div className={styles.options}>
                  <div
                    className={styles.links}
                    onClick={() => handleEditQuiz(quiz?._id)}
                  >
                    <img src='/assets/icons/edit.svg' alt='Edit icon' />
                  </div>
                  <div
                    className={styles.links}
                    onClick={() => handleDeleteQuiz(quiz?._id)}
                  >
                    <img src='/assets/icons/delete.svg' alt='delete icon' />
                  </div>
                  <div
                    className={styles.links}
                    onClick={() => handleShareQuiz(quiz?._id)}
                  >
                    <img src='/assets/icons/share.svg' alt='share icon' />
                  </div>
                </div>
              </td>
              <td
                id='last'
                onClick={() => handleQuestionwiseAnalysis(quiz?._id)}
              >
                Question wise analysis
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuizAnalytics;
