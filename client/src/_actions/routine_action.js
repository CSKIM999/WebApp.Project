import axios from "axios";
import { GET_ROUTINE } from "./types";

export function getRoutine(dataToSubmit) {
  const request = axios
    .post(process.env.REACT_APP_HOST + "/api/routine/routines", dataToSubmit)
    .then((response) => response.data.info);

  return {
    type: GET_ROUTINE,
    payload: request,
  };
}
