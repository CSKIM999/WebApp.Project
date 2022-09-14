import axios from "axios";
import { GET_HISTORY } from "./types";

export function getHistory(dataToSubmit) {
  const request = axios
    .post(process.env.REACT_APP_HOST + "/api/history/mydocs", dataToSubmit)
    .then((response) => response.data.myRecs);

  return {
    type: GET_HISTORY,
    payload: request,
  };
}
