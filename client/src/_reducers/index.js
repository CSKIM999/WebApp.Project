import { combineReducers } from "redux";
import user from "./user_reducer";
import routine from "./routine_reducer";
import history from "./history_reducer";

const rootReducer = combineReducers({
  user,
  routine,
  history,
});

export default rootReducer;
