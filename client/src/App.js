import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import MainPage from "./components/MainPage/MainPage";
import LandingPage from "./components/LandingPage/LandingPage";
import NavBar from "./components/NavBar/NavBar";
import Auth from "./hoc/auth";

function App() {
  const AuthMainPage = Auth(MainPage, true);
  const AuthLandingPage = Auth(LandingPage, false);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<AuthMainPage />} />
        <Route exact path="/front" element={<AuthLandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
