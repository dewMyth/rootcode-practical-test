import axios from "axios";
import React, { useState, useEffect } from "react";

import { useParams } from "react-router";
import QuestionCard from "../components/QuestionCard";

function QuizPage() {
  let { quizId } = useParams();

  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTheQuiz = async () => {
      const response = await axios.get(
        `https://2hol1zaqsj.execute-api.us-east-1.amazonaws.com/dev/challenges?id=${quizId}`
      );

      if (response && response.status == 200) {
        setQuiz(response.data.data[0]);
        setLoading(false);
      } else {
        setError(`Failed to fetch questions for ${quizId}`);
        setLoading(false);
      }
    };

    fetchTheQuiz();
  }, [quizId]);

  return (
    <>
      <div className="container mt-5">
        <h1>{quiz?.challenge}</h1> <span>{quiz?.level}</span>
        <div className="questions-list d-flex flex-column align-items-left gap-4 w-100">
          {loading ? (
            <p className="text-center">Loading quizzes...</p>
          ) : error ? (
            <p className="text-danger text-center">{error}</p>
          ) : quiz.questions.length > 0 ? (
            quiz.questions.map((question) => {
              return <QuestionCard key={question.id} question={question} />;
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
