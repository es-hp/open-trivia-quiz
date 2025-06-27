import { useState } from "react";

export const QuestionForm = ({
  formData,
  questions,
  categoryName,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  currentQuestion,
  setScore,
  loading,
  error,
  setQuizCompleted,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);

  const handleAnswerSubmit = (event) => {
    event.preventDefault();

    if (!selectedAnswer) {
      setFeedback(<p className="error">Please select an answer</p>);
      return;
    }

    const isCorrect = selectedAnswer === currentQuestion.correct_answer;

    if (isCorrect) {
      setFeedback(<p style={{ color: "green" }}>Correct!</p>);
      setScore((prev) => prev + 1);
    } else {
      setFeedback(
        <div>
          <p className="feedback-wrong">Incorrect. </p>
          <p>Correct answer: {currentQuestion.correct_answer}</p>
        </div>
      );
    }
    setShowAnswer(true);
  };

  const handleNext = () => {
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    console.log("question qty:", questions.length);

    if (isLastQuestion) {
      setQuizCompleted(true);
    }

    setSelectedAnswer("");
    setFeedback("");
    setShowAnswer(false);
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  if (loading) return <div id="loading-msg">Loading quiz...</div>;
  if (!currentQuestion) return null; // When rendering data might not be available immediately.

  return (
    <section id="question-form" className="content-container">
      <form onSubmit={handleAnswerSubmit}>
        <div id="quiz-info">
          <p>
            {categoryName}: {formData.difficulty}
          </p>
        </div>
        <div id="question">
          {currentQuestionIndex + 1}. {currentQuestion.question}
        </div>
        <div className="choices-container">
          {currentQuestion.answers.map((choice, index) => {
            return (
              <div key={index} className="choice">
                <input
                  type="radio"
                  id={`choice-${index}`}
                  name="answer"
                  value={choice}
                  onChange={() => setSelectedAnswer(choice)}
                  checked={selectedAnswer === choice}
                  disabled={showAnswer}
                />
                <label htmlFor={`choice-${index}`}>{choice}</label>
              </div>
            );
          })}
        </div>
        {error && <div className="error">{error}</div>}
        {feedback && <div className="feedback-container">{feedback} </div>}
        <div id="btn-group">
          {!showAnswer && (
            <button type="submit" id="answer-submit-btn">
              Submit
            </button>
          )}
          {showAnswer && (
            <button type="button" id="next-question-btn" onClick={handleNext}>
              Next<span style={{ marginLeft: "8px" }}>➜</span>
            </button>
          )}
        </div>
      </form>
    </section>
  );
};
