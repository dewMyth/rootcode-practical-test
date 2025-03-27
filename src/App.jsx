import "./App.css";

// Page Components
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import QuizPage from "./pages/quizPage";

import { Routes, Route } from "react-router";

import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <Routes>
      <Route path="/login" element={!user ? <LoginPage /> : <HomePage />} />
      <Route path="/" element={user ? <HomePage /> : <LoginPage />} />
      <Route
        path="/quiz/:quizId"
        element={user ? <QuizPage /> : <HomePage />}
      />
    </Routes>
  );
}

export default App;
