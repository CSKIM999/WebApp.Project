import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
import Reducer from "./_reducers";
import { ThemeProvider } from "@mui/material/styles";
import { globalTheme } from "./globalTheme";
import { CssBaseline } from "@mui/material";

const createStoreWithMiddleWare = applyMiddleware(
  ReduxThunk,
  promiseMiddleware
)(createStore);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={globalTheme}>
    <CssBaseline />
    <Provider
      store={createStoreWithMiddleWare(
        Reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      )}
    >
      <App />
    </Provider>
  </ThemeProvider>
);
