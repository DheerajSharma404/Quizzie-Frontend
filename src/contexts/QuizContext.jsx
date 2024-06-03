/* eslint-disable react/prop-types */
import React from "react";
import { deleteQuiz, editQuiz, getAllQuizzes, getQuizById } from "../api/quiz";

const QuizContext = React.createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useQuiz = () => {
  return React.useContext(QuizContext);
};

const QuizContextProvider = ({ children }) => {
  const [quizzes, setQuizzes] = React.useState([]);
  const [quiz, setQuiz] = React.useState(null);

  const fetchAllQuizess = async () => {
    const response = await getAllQuizzes();
    setQuizzes(response?.data);
  };

  const handleQuiz = async (quizId) => {
    const response = await getQuizById(quizId);
    setQuiz(response?.data);
  };

  const handleDeleteQuiz = async (quizId) => {
    const response = await deleteQuiz(quizId);
    if (response?.success) {
      fetchAllQuizess();
      return response;
    }
  };

  const handleEditQuiz = async (quizId, quizData) => {
    const response = await editQuiz(quizId, quizData);
    if (response?.success) {
      fetchAllQuizess();
      return response;
    }
  };

  React.useState(() => {
    fetchAllQuizess();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        quizzes,
        setQuizzes,
        quiz,
        handleQuiz,
        handleDeleteQuiz,
        handleEditQuiz,
        fetchAllQuizess,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContextProvider;
