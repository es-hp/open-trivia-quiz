import "../index.css";

export const Results = ({
  formData,
  score,
  questions,
  categoryName,
  handleTryAgain,
}) => {
  return (
    <section id="results" className="content-container">
      <h2>Results</h2>
      <div id="result-grid">
        <p>
          <b>Player:</b>
        </p>
        <p>{formData.user}</p>
        <p>
          <b>Category:</b>
        </p>
        <p>{categoryName}</p>
        <p>
          <b>Difficulty:</b>
        </p>
        <p>{formData.difficulty}</p>
        <p>
          <b>Score:</b>
        </p>
        <p>
          {score} / {questions.length}
        </p>
      </div>
      <button onClick={handleTryAgain}>Try Another Quiz</button>
    </section>
  );
};
