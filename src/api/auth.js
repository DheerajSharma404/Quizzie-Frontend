import axios from "axios";
const baseURL = "http://localhost:3000/api/v1/user";

export const signUpUser = async ({
  name,
  email,
  password,
  confirmPassword,
}) => {
  try {
    const reqURL = `${baseURL}/sign-up`;
    const response = await axios.post(reqURL, {
      name,
      email,
      password,
      confirmPassword,
    });
    return response?.data;
  } catch (error) {
    return error.response?.data;
  }
};

export const signInUser = async ({ email, password }) => {
  try {
    const reqURL = `${baseURL}/sign-in`;
    const response = await axios.post(reqURL, {
      email,
      password,
    });
    localStorage.setItem("x-access-token", response?.data?.data?.token);
    return response?.data;
  } catch (error) {
    return error.response?.data;
  }
};

export const signOut = async () => {
  try {
    const token = localStorage.getItem("x-access-token");
    axios.defaults.headers.common["x-access-token"] = token;
    const requestURL = `${baseURL}/sign-out`;
    const response = await axios.post(requestURL);

    if (response?.data.success) {
      localStorage.removeItem("x-access-token");
    }
    return response?.data;
  } catch (error) {
    return error.response?.data;
  }
};

export const validateUser = async () => {
  try {
    const requestURL = `${baseURL}/validate-token`;
    const token = localStorage.getItem("x-access-token");
    axios.defaults.headers.common["x-access-token"] = token;
    const respones = await axios.post(requestURL);
    return respones?.data;
  } catch (error) {
    return error.response?.data;
  }
};
