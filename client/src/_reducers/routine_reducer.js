import { GET_ROUTINE, MODIFY_ROUTINE } from "../_actions/types";

// eslint-disable-next-line import/no-anonymous-default-export
export default function routine_action(state = {}, action) {
  switch (action.type) {
    case GET_ROUTINE:
      return { ...state, myRoutines: action.payload };
    case MODIFY_ROUTINE:
      return { ...state, mofiedRoutines: action.payload };
    default:
      return state;
  }
}
