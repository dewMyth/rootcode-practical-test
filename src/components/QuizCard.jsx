import React from "react";
import { useNavigate } from "react-router";

function QuizCard({ quiz }) {
  const navigate = useNavigate();

  console.log(quiz);
  return (
    <>
      <div
        className="card shadow-lg border-0"
        style={{ width: "22rem", height: "200px" }}
      >
        <div className="card-body d-flex flex-column text-left">
          <h3 className="card-title fw-bold">{quiz.challenge}</h3>
          <p className="card-subtitle text-muted mb-3">{quiz.level}</p>
          <div className="mt-auto">
            <button
              className="btn btn-primary w-100"
              onClick={() => navigate(`/quiz/${quiz.id}`)}
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuizCard;
