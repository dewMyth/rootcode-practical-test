import "./App.css";

// Page Components
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import QuizPage from "./pages/quizPage";

import { Routes, Route } from "react-router";

function App() {
  const isLoggedIn = false; // Check if user exists

  return (
    <Routes>
      <Route
        path="/login"
        element={!isLoggedIn ? <LoginPage /> : <HomePage />}
      />
      <Route path="/" element={isLoggedIn ? <HomePage /> : <LoginPage />} />
      <Route
        path="/quiz/:quizId"
        element={isLoggedIn ? <QuizPage /> : <LoginPage />}
      />
    </Routes>
  );
}

export default App;
