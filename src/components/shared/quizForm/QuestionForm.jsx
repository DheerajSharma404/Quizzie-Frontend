/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useModal } from "../../../contexts/ModalContext";

import { toast } from "sonner";
import { createQuiz } from "../../../api/quiz";
import { AuthContext } from "../../../contexts/AuthContext";
import { useQuiz } from "../../../contexts/QuizContext";
import { QuizValidation } from "../../../validators";
import styles from "./QuestionForm.module.css";
import QuestionPublishedCard from "./quizPublishedCard/QuizPublishedCard";

const QuestionForm = ({ action, quizId, quizNameAndType }) => {
  const { toggleModal, changeModalContent } = useModal();
  const { user, setUser } = React.useContext(AuthContext);
  const { quizzes: Quizzes, handleEditQuiz, fetchAllQuizess } = useQuiz();
  const [quizData] = React.useState(
    Quizzes?.find((quiz) => quiz?._id === quizId)
  );
  console.log("quizData", quizData);
  const [formErrors, setFormErrors] = React.useState({});

  const [formData, setFormData] = React.useState({
    quizName:
      action === "create" ? quizNameAndType.quizName : quizData?.quizName || "",
    quizType:
      action === "create" ? quizNameAndType.quizType : quizData?.quizType || "",
    optionType: quizData?.optionType || "Text",
    questions: quizData?.questions || [
      {
        id: uuidv4(),
        question: "",
        options: [
          { id: uuidv4(), text: "", image: "", selectedCount: 0 },
          { id: uuidv4(), text: "", image: "", selectedCount: 0 },
        ],
        correctAnswer: "",
        attemptedCount: 0,
        correctlyAnsweredCount: 0,
        incorrectlyAnsweredCount: 0,
      },
    ],
    impressionCount: quizData?.impressionCount || 0,
  });
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [correctAnswer, setCorrectAnswer] = React.useState(
    quizData?.questions[currentQuestion]?.correctAnswer || ""
  );
  const [timer, setTimer] = React.useState(
    quizData?.questions[currentQuestion]?.timer || 0
  );

  console.log("formData", formData);

  const handleCurrentQuestion = (index) => {
    if (action === "edit") {
      const selectedQuestion = formData?.questions[index - 1];
      setCurrentQuestion(index - 1);
      setCorrectAnswer(selectedQuestion?.correctAnswer || "");
      setTimer(selectedQuestion?.timer || 0);
    } else {
      const selectedQuestion = formData?.questions[index];
      setCurrentQuestion(index);
      setCorrectAnswer(selectedQuestion?.correctAnswer || "");
      setTimer(selectedQuestion?.timer || 0);
    }
  };

  const handleUpdateQuizData = (field, value) => {
    setFormData((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleQuestionChange = (index, value) => {
    setFormData((prevState) => {
      const updatedQuestions = [...prevState.questions];
      updatedQuestions[index].question = value;
      return { ...prevState, questions: updatedQuestions };
    });
  };

  const handleAddQuestion = () => {
    setFormData((prevState) => ({
      ...prevState,
      questions: [
        ...prevState.questions,
        {
          id: uuidv4(),
          question: "",
          options: [
            { id: uuidv4(), text: "", image: "", selectedCount: 0 },
            { id: uuidv4(), text: "", image: "", selectedCount: 0 },
          ],
          correctAnswer: "",
          attemptedCount: 0,
          correctlyAnsweredCount: 0,
          incorrectlyAnsweredCount: 0,
        },
      ],
    }));
    setCurrentQuestion(formData?.questions?.length);
    setCorrectAnswer("");
    setTimer(0);
  };

  const handleRemoveQuestion = (id) => {
    if (action === "edit") {
      handleCurrentQuestion(id === 0 ? 0 : id - 1);
    } else {
      handleCurrentQuestion(id);
    }
    if (formData.questions.length > 1) {
      setFormData((prevState) => {
        const updatedQuestions = prevState.questions.filter(
          (question, index) => index !== id
        );
        setCurrentQuestion(id === 0 ? 0 : id - 1);
        return { ...prevState, questions: updatedQuestions };
      });
    }
  };

  const handleDeleteOption = (id) => {
    setFormData((prevState) => {
      const updatedQuestions = [...prevState.questions];
      updatedQuestions[currentQuestion].options = updatedQuestions[
        currentQuestion
      ].options.filter((option) => option.id !== id);
      return { ...prevState, questions: updatedQuestions };
    });
  };

  const handleAddOption = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setFormData((prevState) => {
      const updatedQuestions = [...prevState.questions];
      return {
        ...prevState,
        questions: updatedQuestions.map((question, index) => {
          if (index === currentQuestion && question.options.length < 4) {
            return {
              ...question,
              options: question.options.concat({
                id: uuidv4(),
                text: "",
                image: "",
                selectedCount: 0,
              }),
            };
          }
          return question;
        }),
      };
    });
  };

  const handleOptionChange = (index, field, value) => {
    setFormData((prevState) => {
      const updatedQuestions = [...prevState.questions];
      updatedQuestions[currentQuestion].options[index][field] = value;
      return { ...prevState, questions: updatedQuestions };
    });
  };

  const handleCorrectOpiton = (e) => {
    setCorrectAnswer(e.target.value);
    setFormData((prevState) => {
      const updatedQuestions = [...prevState.questions];
      updatedQuestions[currentQuestion].correctAnswer = e.target.value;
      return { ...prevState, questions: updatedQuestions };
    });
  };

  const handletimer = (time) => {
    setTimer(time);
    setFormData((prevState) => {
      const updatedQuestions = [...prevState.questions];
      updatedQuestions[currentQuestion].timer = time;
      return { ...prevState, questions: updatedQuestions };
    });
  };

  const validateForm = () => {
    const validation = QuizValidation.quizValidationSchema.safeParse(formData);
    if (!validation.success) {
      const error = validation.error;
      let newError = {};
      for (const issue of error.issues) {
        newError = { ...newError, [issue.path[0]]: issue.message };
      }
      setFormErrors(newError);
      return false;
    }

    for (let i = 0; i < formData.questions.length; i++) {
      if (
        formData.quizType === "Q & A" &&
        !formData.questions[i].correctAnswer
      ) {
        toast.error("Please select correct answer for all questions");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setFormErrors({});

    if (action === "edit") {
      const response = await handleEditQuiz(quizId, formData);
      if (response?.success) {
        toast.success("Quiz updated successfully");
        fetchAllQuizess();

        const updatedUser = {
          ...user,
          questionCount: user?.questionCount + formData.questions.length,
        };
        setUser(updatedUser);

        changeModalContent(
          <QuestionPublishedCard quizId={response?.data?._id} />
        );
      } else {
        toast.error(response?.error?.explanation);
      }
    } else {
      const response = await createQuiz(formData);
      if (response?.success) {
        toast.success("Quiz created successfully");

        const updatedUser = {
          ...user,
          quizCount: user?.quizCount + 1,
          questionCount: user?.questionCount + formData.questions.length,
        };
        setUser(updatedUser);
        fetchAllQuizess();

        changeModalContent(
          <QuestionPublishedCard quizId={response?.data?._id} />
        );
      } else {
        toast.error(response?.error?.explanation);
      }
    }
  };

  return (
    <div className={styles.questionFormWrapper}>
      <form className={styles.questionForm} onSubmit={handleSubmit}>
        <div className={styles.questionNumberWrapper}>
          <div className={styles.questionNumberAndAddBtnWrapper}>
            {formData?.questions?.map((item, index) => (
              <div
                key={item?.id}
                className={styles.questionNumber}
                onClick={() => handleCurrentQuestion(index)}
              >
                {index + 1}
                {index > 0 && (
                  <button
                    type='button'
                    className={styles.removeQuestionIcon}
                    onClick={() => handleRemoveQuestion(item?.id)}
                  >
                    <img src='/assets/icons/cross.svg' alt='Remove icon' />
                  </button>
                )}
              </div>
            ))}
            {formData?.questions?.length < 5 && (
              <button
                type='button'
                className={styles.addQuestionIcon}
                onClick={handleAddQuestion}
              >
                <img src='/assets/icons/plus.svg' alt='Plus icon' />
              </button>
            )}
          </div>
          {formData?.questions?.length < 5 && (
            <div className={styles.maxQuestionLable}>Max 5 questions</div>
          )}
        </div>
        <div className={styles.question}>
          <input
            type='text'
            value={formData?.questions[currentQuestion]?.question}
            id='question'
            placeholder={`${
              action === "create"
                ? quizNameAndType.quizType + " " + "Question"
                : "Question"
            }`}
            required
            onChange={(e) =>
              handleQuestionChange(currentQuestion, e.target.value)
            }
          />
        </div>
        <div className={styles.optionsTypeWrapper}>
          <div className={styles.optionTypeLabel}>Option Type</div>
          <div className={styles.optionTypeWrapper}>
            {["Text", "Image URL", "Text & Image URL"].map((type) => (
              <div key={type} className={styles.optionType}>
                <input
                  type='radio'
                  id={type}
                  value={type}
                  name='optionType'
                  checked={formData.optionType === type}
                  onChange={(e) =>
                    handleUpdateQuizData("optionType", e.target.value)
                  }
                />
                <label htmlFor={type}>{type}</label>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.optionsAndTimerWrapper}>
          <div className={styles.optionsWrapper}>
            {formData?.questions[currentQuestion]?.options.map(
              (option, index) => (
                <div key={option.id} className={styles.option}>
                  {formData?.quizType === "Q & A" && (
                    <input
                      type='radio'
                      name='options'
                      value={option?.id}
                      onChange={(e) => handleCorrectOpiton(e)}
                      checked={correctAnswer === option?.id}
                    />
                  )}
                  <input
                    type='text'
                    placeholder={
                      formData?.optionType === "Text & Image URL"
                        ? "Text"
                        : formData?.optionType
                    }
                    value={
                      formData?.optionType === "Text" ||
                      formData?.optionType === "Text & Image URL"
                        ? option?.text
                        : option?.image
                    }
                    required
                    onChange={(e) =>
                      handleOptionChange(
                        index,
                        formData.optionType === "Text & Image URL" ||
                          formData.optionType === "Text"
                          ? "text"
                          : "image",
                        e.target.value
                      )
                    }
                    className={`${
                      correctAnswer === option?.id && styles.correctOption
                    } `}
                    style={{
                      width: `${
                        formData.optionType === "Text & Image URL"
                          ? "11.34rem"
                          : "15.99rem"
                      }`,
                    }}
                  />
                  {formData.optionType === "Text & Image URL" && (
                    <input
                      type='text'
                      placeholder='Image URL'
                      value={option?.image}
                      required
                      onChange={(e) =>
                        handleOptionChange(index, "image", e.target.value)
                      }
                      style={{ marginLeft: "0", width: "15.99rem" }}
                      className={`${
                        correctAnswer === option?.id && styles.correctOption
                      }`}
                    />
                  )}
                  {index > 1 && (
                    <button
                      type='button'
                      className={styles.deleteOptionBtn}
                      onClick={() => handleDeleteOption(option?.id)}
                    >
                      <img src='/assets/icons/delete.svg' alt='Remove icon' />
                    </button>
                  )}
                </div>
              )
            )}
            {formData.questions[currentQuestion]?.options?.length !== 4 && (
              <div className={styles.addOptionBtnWrapper}>
                <button type='button' onClick={(e) => handleAddOption(e)}>
                  Add Option
                </button>
              </div>
            )}
          </div>
          {formData.quizType === "Q & A" && (
            <div className={styles.timersWrapper}>
              <div className={styles.timerLabel}>Timer</div>
              <div className={styles.timerWrapper}>
                {[0, 5, 10].map((time) => (
                  <div
                    key={time}
                    className={`${styles.timer} ${
                      timer === time && styles.selectedTimer
                    }`}
                    onClick={() => handletimer(time)}
                  >
                    {time === 0 ? "OFF" : time + " sec"}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className={styles.EditCancelAndContinueBtnWrapper}>
          <button
            type='button'
            className={styles.cancel}
            onClick={() => toggleModal()}
          >
            Cancel
          </button>
          <button type='submit' className={styles.continue}>
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestionForm;
