import React from "react";
import { useNavigate } from "react-router";

function QuizCard({ quiz, status }) {
  console.log(quiz.id, status);
  const navigate = useNavigate();

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
            {!status ? (
              <button
                className="btn btn-primary w-100"
                onClick={() => navigate(`/quiz/${quiz.id}`)}
              >
                Start Quiz
              </button>
            ) : (
              <button className="btn btn-success w-100">Completed</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default QuizCard;
