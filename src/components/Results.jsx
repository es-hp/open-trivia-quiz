import "../index.css";

export const Results = ({
  user,
  score,
  questions,
  categoryName,
  difficulty,
  handleTryAgain,
}) => {
  return (
    <section id="results" className="content-container">
      <h2>Results</h2>
      <div id="result-grid">
        <p>
          <b>Player:</b>
        </p>
        <p>{user}</p>
        <p>
          <b>Category:</b>
        </p>
        <p>{categoryName}</p>
        <p>
          <b>Difficulty:</b>
        </p>
        <p>{difficulty}</p>
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
