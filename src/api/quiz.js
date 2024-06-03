import axios from "axios";

const baseURL = "http://localhost:3000/api/v1/quizzes";

export const createQuiz = async (data) => {
  try {
    const token = localStorage.getItem("x-access-token");
    axios.defaults.headers.common["x-access-token"] = token;
    const requestURL = `${baseURL}/create-quiz`;
    const response = await axios.post(requestURL, data);
    return response?.data;
  } catch (error) {
    return error.response?.data;
  }
};

export const getQuizById = async (quizId) => {
  try {
    const requestURL = `${baseURL}/${quizId}`;
    const response = await axios.get(requestURL);
    return response?.data;
  } catch (error) {
    return error.response?.data;
  }
};

export const getAllQuizzes = async () => {
  try {
    const token = localStorage.getItem("x-access-token");
    axios.defaults.headers.common["x-access-token"] = token;
    const response = await axios.get(baseURL);
    return response?.data;
  } catch (error) {
    return error.response?.data;
  }
};

export const editQuiz = async (quizId, data) => {
  try {
    const requestURL = `${baseURL}/edit-quiz/${quizId}`;
    const response = await axios.patch(requestURL, data);
    return response?.data;
  } catch (error) {
    return error.response?.data;
  }
};

export const deleteQuiz = async (quizId) => {
  try {
    const token = localStorage.getItem("x-access-token");
    axios.defaults.headers.common["x-access-token"] = token;
    const requestURL = `${baseURL}/delete-quiz/${quizId}`;
    const response = await axios.delete(requestURL, quizId);
    return response?.data;
  } catch (error) {
    return error.response?.error;
  }
};

export const upadateQuizStats = async (quizId, data) => {
  try {
    const requestURL = `${baseURL}/update-quiz-stats/${quizId}`;
    const response = await axios.patch(requestURL, data);
    return response?.data;
  } catch (error) {
    return error.response?.error;
  }
};
