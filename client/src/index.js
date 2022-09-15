import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@mui/material/styles";
import { globalTheme } from "./globalTheme";
import { CssBaseline } from "@mui/material";
// import Reducer from "./_reducers";
// import { persistStore } from "redux-persist";

import configureStore from "./_reducers";

// const createStoreWithMiddleWare = applyMiddleware(
//   ReduxThunk,
//   promiseMiddleware
// )(createStore);
const { persistor, store } = configureStore();

// const persistor = persistStore(createStoreWithMiddleWare);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={globalTheme}>
    <CssBaseline />
    <Provider
      // store={createStoreWithMiddleWare(
      //   Reducer,
      //   window.__REDUX_DEVTOOLS_EXTENSION__ &&
      //     window.__REDUX_DEVTOOLS_EXTENSION__()
      // )}
      store={store}
    >
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </ThemeProvider>
);
