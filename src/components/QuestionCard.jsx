import React from "react";

function QuestionCard({ question }) {
  console.log(question);
  return (
    <div className="card shadow-sm p-3 mb-5 bg-body rounded">
      <div className="card-body text-left">
        <h5 className="card-title">{question.question}</h5>
        <button
          className="btn btn-primary"
          onClick={() => console.log("Hello World!")}
        >
          Start
        </button>
      </div>
    </div>
  );
}

export default QuestionCard;
