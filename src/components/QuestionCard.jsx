import React, { useState, useEffect } from "react";
import "./QuestionCard.css";

import { useDispatch } from "react-redux";
import { addAnswer } from "../redux/quizReducer";

function QuestionCard({ question }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const dispatch = useDispatch();

  const handleOpenModal = () => {
    resetTimer();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    resetTimer();
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("blurred");
    } else {
      document.body.classList.remove("blurred");
    }
  }, [isModalOpen]);

  const handleOptionChange = (e) => {
    e.preventDefault();
    const selectedValue = e.target.value;
    setSelectedAnswer(selectedValue);

    // Dispatch the selected answer immediately
    dispatch(addAnswer({ questionId: question.id, answer: selectedValue }));
  };

  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimer((prevCount) => prevCount + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const resetTimer = () => {
    setTimer(0);
    setIsRunning(true); // Restart the timer
  };

  return (
    <div>
      <div className="content-container">
        <div className="card shadow-sm p-3 mb-5 bg-body rounded">
          <div className="card-body text-left">
            <h5 className="card-title">{question.question}</h5>
            <button className="btn btn-primary" onClick={handleOpenModal}>
              Start
            </button>
          </div>
        </div>
      </div>

      {/* mcq modal */}
      {isModalOpen && (
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{question.question}</h5>

                <div style={{ textAlign: "center", padding: "20px" }}>
                  <h1>{timer} seconds</h1>
                </div>
              </div>

              <div className="container">
                <div key={question.id} className="form-check">
                  {question.options.map((option, index) => {
                    return (
                      <div key={index} className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          name="question"
                          value={option}
                          onChange={handleOptionChange}
                          checked={selectedAnswer == option}
                          id={`option-${index}`}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`option-${index}`}
                        >
                          {option}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestionCard;
