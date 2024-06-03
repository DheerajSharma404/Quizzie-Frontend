/* eslint-disable no-unused-vars */
import React from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { getQuizById, upadateQuizStats } from "../../../api/quiz";
import styles from "./LiveQuiz.module.css";

const LiveQuiz = () => {
  const { quizId } = useParams();
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [quiz, setQuiz] = React.useState(null);
  const [score, setScore] = React.useState(0);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [correctAnswerCount, setCorrectAnswerCount] = React.useState(0);
  const [incorrectAnswerCount, setIncorrectAnswerCount] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [showResult, setShowResult] = React.useState(false);

  const updateQuizCounts = (isCorrect) => {
    const question = quiz?.questions[currentQuestion];
    if (isCorrect) {
      setCorrectAnswerCount((prev) => prev + 1);
      question.correctlyAnsweredCount += 1;
    } else {
      setIncorrectAnswerCount((prev) => prev + 1);
      question.incorrectlyAnsweredCount += 1;
    }
    question.attemptedCount =
      question?.correctlyAnsweredCount + question?.incorrectlyAnsweredCount;
  };

  const updateSelectionOptionCount = (optionId) => {
    const question = quiz?.questions[currentQuestion];
    const option = question?.options.find((opt) => opt.id === optionId);
    option.selectedCount += 1;
  };

  const handleClick = async () => {
    if (quiz?.quizType === "Poll Type") {
      updateSelectionOptionCount(selectedOption);
      setSelectedOption(null);
      if (currentQuestion === quiz?.questions.length - 1) {
        setShowResult(true);

        const response = await upadateQuizStats(quiz?._id, quiz);
        if (response?.success) {
          toast.success("Successfully submitted the response"); // make the update request to modify the quiz data
        } else {
          toast.error(response?.error?.explanation);
        }

        if (count !== 0) {
          setCount(0);
        }
      } else {
        setCurrentQuestion((prev) => prev + 1);
        setCount(quiz?.questions[currentQuestion + 1]?.timer || 0);
      }
      return;
    }

    if (quiz?.quizType === "Q & A") {
      if (selectedOption === quiz?.questions[currentQuestion]?.correctAnswer) {
        setScore((prev) => prev + 1);
        updateQuizCounts(true);
      } else {
        updateQuizCounts(false);
      }

      setSelectedOption(null);

      if (currentQuestion === quiz?.questions.length - 1) {
        setShowResult(true);

        const response = await upadateQuizStats(quiz?._id, quiz);
        if (response?.success) {
          toast.success("Successfully submitted the response.");
        } else {
          toast.error(response?.error?.explanation);
        }

        if (count !== 0) {
          setCount(0);
        }
      } else {
        setCurrentQuestion((prev) => prev + 1);
        setCount(quiz?.questions[currentQuestion + 1]?.timer || 0);
      }
    }
  };

  React.useEffect(() => {
    let timer;
    if (count > 0 && quiz?.questions[currentQuestion]?.timer) {
      timer = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
    } else if (count === 0 && !showResult) {
      handleClick();
    }
    return () => clearInterval(timer);
  }, [count, showResult]);

  React.useEffect(() => {
    if (
      quiz &&
      quiz.questions &&
      quiz.questions[currentQuestion] &&
      quiz.questions[currentQuestion]?.timer && // Check if timer property exists
      count === 0
    ) {
      setCount(quiz.questions[currentQuestion].timer || 0);
    }
  }, [quiz, currentQuestion]);

  React.useEffect(() => {
    const fetchQuiz = async () => {
      const response = await getQuizById(quizId);
      setQuiz(response?.data);
    };
    fetchQuiz();
  }, [quizId]);

  const handleSelect = (id) => {
    setSelectedOption(id);
  };

  return (
    <div className={styles.liveQuizWrapper}>
      {!showResult && (
        <div className={styles.questionWrapper}>
          <div className={styles.questionCountAndTimerWrapper}>
            <div className={styles.questionCount}>{`0${currentQuestion + 1}/0${
              quiz?.questions.length
            }`}</div>
            {quiz?.questions[currentQuestion].timer && (
              <div className={styles.timer}>
                {count <= 9 ? `00 : 0${count}s` : `00 : ${count}s`}
              </div>
            )}
          </div>
          <div className={styles.question}>
            {quiz?.questions[currentQuestion]?.question}
          </div>
          {quiz?.optionType === "Text" && (
            <div className={`${styles.optionsWrapper}`}>
              {quiz?.questions[currentQuestion]?.options.map(
                (option, index) => (
                  <div
                    className={`${styles.option}  ${
                      selectedOption === option?.id && styles.optionSelected
                    }`}
                    onClick={() => handleSelect(option?.id)}
                    key={index}
                  >
                    {option?.text}
                  </div>
                )
              )}
            </div>
          )}
          {quiz?.optionType === "Image URL" && (
            <div className={`${styles.imageOptionsWrapper}`}>
              {quiz?.questions[currentQuestion]?.options.map(
                (option, index) => (
                  <div
                    className={styles.optionImage}
                    onClick={() => handleSelect(option?.id)}
                    key={index}
                  >
                    <img
                      src={option?.image}
                      alt='fjords'
                      className={`${styles.optionImage} ${
                        selectedOption === option?.id && styles.optionSelected
                      }`}
                    />
                  </div>
                )
              )}
            </div>
          )}
          {quiz?.optionType === "Text & Image URL" && (
            <div className={`${styles.textAndImageOptionsWrapper}`}>
              {quiz?.questions[currentQuestion]?.options.map(
                (option, index) => (
                  <div
                    className={`${styles.optionTextandImage} ${
                      selectedOption === option?.id && styles.optionSelected
                    }`}
                    onClick={() => handleSelect(option?.id)}
                    key={index}
                  >
                    <p className={styles.text}>{option?.text}</p>
                    <img
                      src={option?.image}
                      alt='fjords'
                      className={styles.Image}
                    />
                  </div>
                )
              )}
            </div>
          )}
          <div className={styles.actionButtonsWrapper}>
            <button className={styles.nextBtn} onClick={handleClick}>
              {currentQuestion === quiz?.questions.length - 1
                ? "Submit"
                : "Next"}
            </button>
          </div>
        </div>
      )}
      {showResult && quiz?.quizType === "Q & A" ? (
        <div className={styles.resultWrapper}>
          <div className={styles.contentWrapper}>
            <h1>Congrats Quiz is completed</h1>
            <div>
              <img
                src='/assets/icons/trophy.svg'
                alt='Trophy Image'
                className={styles.trophy}
              />
            </div>
            <h2>
              Your Score is{" "}
              <span
                className={styles.score}
              >{`0${score}/0${quiz?.questions?.length}`}</span>
            </h2>
          </div>
        </div>
      ) : showResult && quiz?.quizType === "Poll Type" ? (
        <div className={styles.resultWrapper}>
          <div className={styles.pollContentWrapper}>
            <h1>
              Thank you <br /> for participating <br /> in the Poll
            </h1>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default LiveQuiz;
