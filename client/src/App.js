import "./App.css";
// before BrowserRouter => HashRouter
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import MainPage from "./components/MainPage/MainPage";
import LandingPage from "./components/LandingPage/LandingPage";
import Auth from "./hoc/auth";

function App() {
  const AuthMainPage = Auth(MainPage, true);
  const AuthLandingPage = Auth(LandingPage, false);

  return (
    <Router>
      <Routes>
        <Route exact path="/home" element={<AuthMainPage />} />
        <Route exact path="/" element={<AuthLandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
