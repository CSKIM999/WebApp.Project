import { GET_HISTORY } from "../_actions/types";

export default function history_action(state = {}, action) {
  switch (action.type) {
    case GET_HISTORY:
      return { ...state, myDocs: action.payload };
    default:
      return state;
  }
}
