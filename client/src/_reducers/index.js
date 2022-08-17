import { combineReducers } from "redux";
import user from "./user_reducer";
import routine from "./routine_reducer";

const rootReducer = combineReducers({
  user,
  routine,
});

export default rootReducer;
