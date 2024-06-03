/* eslint-disable react/prop-types */
import React from "react";
import { useModal } from "../../../../contexts/ModalContext";

import { toast } from "sonner";
import QuestionForm from "../QuestionForm";
import styles from "./QuizNameAndTypeCard.module.css";

const QuizNameAndTypeCard = () => {
  const { toggleModal, changeModalContent } = useModal();
  const [quizType, setQuizType] = React.useState();
  const [quizData, setQuizData] = React.useState({
    quizName: "",
    quizType: "",
  });

  const handleQuizName = (e) => {
    setQuizData((prevState) => ({ ...prevState, quizName: e.target.value }));
  };

  const handleQuiztype = (type) => {
    setQuizType(type);
    setQuizData((prevState) => ({ ...prevState, quizType: type }));
  };
  const handleOnContinue = () => {
    if (quizData.quizName.trim() !== "" && quizData.quizType !== "") {
      changeModalContent(
        <QuestionForm quizNameAndType={quizData} action='create' />
      );
    }
    if (quizData.quizType === "") {
      toast.info("Please select quiz type");
    }
    if (quizData.quizName.trim() === "") {
      toast.info("Please enter quiz name");
    }
  };
  return (
    <div className={styles.quizNameAndTypeCardWrapper}>
      <div className={styles.quizNameWrapper}>
        <input
          type='text'
          placeholder='Quiz name'
          value={quizData?.quizName}
          required
          onChange={handleQuizName}
        />
      </div>
      <div className={styles.quizTypeWrapper}>
        <div className={styles.quizTypeLabel}>Quiz Type</div>
        <div className={styles.quizTypeOptionWrapper}>
          <div
            className={`${styles.quizType} ${
              quizType === "Q & A" && styles.selectedQuizType
            }`}
            onClick={() => handleQuiztype("Q & A")}
          >
            Q & A
          </div>
          <div
            className={`${styles.quizType} ${
              quizType === "Poll Type" && styles.selectedQuizType
            }`}
            onClick={() => handleQuiztype("Poll Type")}
          >
            Poll Type
          </div>
        </div>
      </div>
      <div className={styles.cancelAndContinueBtnWrapper}>
        <button className={styles.cancel} onClick={() => toggleModal()}>
          Cancel
        </button>
        <button className={styles.continue} onClick={handleOnContinue}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default QuizNameAndTypeCard;
