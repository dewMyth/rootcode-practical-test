import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import QuizCard from "../components/QuizCard";
import axios from "axios";

const filterByLang = [
  { id: 101, name: "TYPESCRIPT" },
  { id: 102, name: "PYTHON" },
  { id: 103, name: "C" },
  { id: 104, name: "JAVA" },
  { id: 105, name: "SQL" },
];

function HomePage() {
  const user = useSelector((state) => state.auth.user);

  const [quizList, setQuizList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    console.log(filter);

    const fetchQuizzes = async () => {
      let response;

      if (!filter) {
        response = await axios.get(
          `https://2hol1zaqsj.execute-api.us-east-1.amazonaws.com/dev/challenges`
        );
      } else {
        response = await axios.get(
          `https://2hol1zaqsj.execute-api.us-east-1.amazonaws.com/dev/challenges?language=${filter}`
        );
      }

      if (
        response &&
        response.status === 200 &&
        response.data.status == "success"
      ) {
        setQuizList(response.data.data);
        setLoading(false);
      } else {
        setError("Failed to fetch quizzes.");
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [filter]);

  return (
    <>
      <div className="container mt-5">
        <h1 className="text-left">Hi, {user?.email}!</h1>
        <h2 className="text-left mb-4">Welcome to the Quiz App</h2>
        <br />

        <div className="mb-4">
          <label htmlFor="filter" className="form-label">
            Filter Quizzes by Language:
          </label>
          <select
            id="filter"
            className="form-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {filterByLang.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Due to optional will attend later */}
        {/* <div className="mb-4">
          <label htmlFor="filter" className="form-label">
            Filter Quizzes by Difficulty:
          </label>
          <select
            id="filter"
            className="form-select"
            // value={filter}
            // onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div> */}

        <br />
        <div className="quiz-list d-flex flex-wrap justify-content-center gap-4">
          {loading ? (
            <p className="text-center">Loading quizzes...</p>
          ) : error ? (
            <p className="text-danger text-center">{error}</p>
          ) : quizList.length > 0 ? (
            quizList.map((quiz) => <QuizCard key={quiz.id} quiz={quiz} />)
          ) : (
            <p className="text-center">No quizzes available.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default HomePage;
