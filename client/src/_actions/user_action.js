import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "./types";

export function loginUser(dataToSubmit) {
  const request = axios
    .post(process.env.REACT_APP_HOST + "/api/user/login", dataToSubmit, {
      withCredentials: true,
    })
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function registerUser(dataToSubmit) {
  const request = axios
    .post(process.env.REACT_APP_HOST + "/api/user/register", dataToSubmit, {
      withCredentials: true,
    })
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function auth(prop) {
  const token = !prop ? "" : prop;
  const request = axios
    .get(process.env.REACT_APP_HOST + "/api/user/auth", {
      params: { token: token },
      withCredentials: true,
    })
    .then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}
