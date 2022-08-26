import { GET_ROUTINE } from "../_actions/types";

export default function routine_action(state = {}, action) {
  switch (action.type) {
    case GET_ROUTINE:
      return { ...state, myRoutines: action.payload };
    default:
      return state;
  }
}
