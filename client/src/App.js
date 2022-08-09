import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import LandingPage from "./components/MainPage/MainPage";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
