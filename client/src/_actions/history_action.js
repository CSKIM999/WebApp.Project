import axios from "axios";
import { GET_HISTORY } from "./types";

export function getHistory(dataToSubmit) {
  const request = axios
    .post("/api/history/mydocs", dataToSubmit)
    .then((response) => response.data.myRecs);

  return {
    type: GET_HISTORY,
    payload: request,
  };
}
