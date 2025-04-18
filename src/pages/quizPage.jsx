import axios from "axios";
import React, { useState, useEffect } from "react";

import { useParams, Link } from "react-router";
import QuestionCard from "../components/QuestionCard";

import { useDispatch } from "react-redux";
import { setQuizId } from "../redux/quizReducer";

import { useSelector } from "react-redux";

function QuizPage() {
  let { quizId } = useParams();

  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [progress, setProgress] = useState(0);

  // const dispatch = useDispatch();

  const completed = useSelector((state) => state.quiz.quizData);

  useEffect(() => {
    const fetchTheQuiz = async () => {
      const response = await axios.get(
        `https://2hol1zaqsj.execute-api.us-east-1.amazonaws.com/dev/challenges?id=${quizId}`
      );

      if (response && response.status == 200) {
        setQuiz(response.data.data[0]);

        // COmpleted for this quiz
        const completedForThisQuiz = completed.filter(
          (q) => q.quizId == quizId
        );

        console.log("completedForThisQuiz", completedForThisQuiz);

        setProgress(
          (completedForThisQuiz?.length /
            response.data.data[0].questions?.length) *
            100
        );
        console.log(response.data.data[0].questions.length);
        // dispatch(setQuizId(response.data.data[0].id));
        setLoading(false);
      } else {
        setError(`Failed to fetch questions for ${quizId}`);
        setLoading(false);
      }
    };

    fetchTheQuiz();
  }, [quizId, completed]);

  return (
    <>
      <div className="container mt-5">
        <Link to={`/`}>Back</Link>
        <h1>
          {quiz?.challenge} ({quiz?.level})
        </h1>
        <p>Your Progress for this quiz</p>
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${progress}%` }}
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {progress}% COMPLETED
          </div>
        </div>
        <br />
        <div className="questions-list d-flex flex-column align-items-left gap-4 w-100">
          {loading ? (
            <p className="text-center">Loading quizzes...</p>
          ) : error ? (
            <p className="text-danger text-center">{error}</p>
          ) : quiz.questions.length > 0 ? (
            quiz.questions.map((question) => {
              return (
                <QuestionCard
                  key={question.id}
                  question={question}
                  quizId={quizId}
                />
              );
            })
          ) : (
            <p className="text-center">No quizzes available.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default QuizPage;
