import axios from "axios";
import { GET_ROUTINE, MODIFY_ROUTINE } from "./types";

export function getRoutine(dataToSubmit) {
  const request = axios
    .post("/api/routine/routines", dataToSubmit)
    .then((response) => response.data.info);

  return {
    type: GET_ROUTINE,
    payload: request,
  };
}

export function modifyRoutine(dataToSubmit) {
  const request = axios
    .post("/api/routine/", dataToSubmit)
    .then((response) => response.data);

  return {
    type: MODIFY_ROUTINE,
    payload: request,
  };
}
