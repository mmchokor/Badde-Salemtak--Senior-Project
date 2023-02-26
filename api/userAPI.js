import { API_URL } from "../constants/apiURL";
import axios from "axios";

// It is a sign up function that takes data as a parameter and returns the result
// results contain all the user info in a form of an object
const signUp = async (data) => {
  const response = await axios.post(`${API_URL}/users/`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

// It is a sign in function that takes data as a parameter and returns the result
// results contain all the user info in a form of an object
const signIn = async (data) => {
  const response = await axios.post(`${API_URL}/users/login`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

// It is a forget password function that takes data as a parameter and returns the result
// return either a success message or an error message
const forgetPassword = async (data) => {
  const response = await fetch(`${API_URL}/users/forgetPassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
};

// It is a update user info function that takes data and token as a parameter and returns the result
// return the updates user info in a form of an object
const updateUserInfo = async (data, token) => {
  const response = await fetch(`${API_URL}/users/updateMe`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
};

// It is a update user password function that takes data and token as a parameter and returns the result
// return either a success message or an error message and the user with new token
const updateUserPassword = async (data, token) => {
  const response = await fetch(`${API_URL}/users/updateMyPassword`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
};

// export all module
export { signUp, signIn, forgetPassword, updateUserInfo, updateUserPassword };
