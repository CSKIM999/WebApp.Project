import user from "./user_reducer";
import routine from "./routine_reducer";
import history from "./history_reducer";

import { combineReducers, applyMiddleware, createStore, compose } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["user"],
};

const enhancers = [
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
];
const middleware = [ReduxThunk, promiseMiddleware];

const rootReducer = combineReducers({
  user,
  routine,
  history,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const configureStore = () => {
  const store = createStore(persistedReducer, composedEnhancers);
  return { store, persistor: persistStore(store) };
};

export default configureStore;
