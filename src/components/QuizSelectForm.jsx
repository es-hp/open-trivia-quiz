export const QuizSelectForm = ({
  user,
  setUser,
  category,
  setCategory,
  setCategoryName,
  difficulty,
  setDifficulty,
  handleFormSubmit,
  error,
}) => {
  return (
    <section className="content-container">
      <form id="quiz-form" onSubmit={handleFormSubmit}>
        <div className="input-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            value={user}
            onChange={(event) => {
              setUser(event.target.value);
            }}
          />
          {error && user === "" && <p className="error">Name is required.</p>}
        </div>
        <div className="input-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
              const selectedIndex = event.target.selectedIndex;
              const selectedOption = event.target.options[selectedIndex];
              setCategoryName(selectedOption.text);
            }}
          >
            <option value="" className="disabled" disabled selected>
              Please select a category
            </option>
            <option value="15">Video Games</option>
            <option value="16">Board Games</option>
            <option value="31">Anime & Manga</option>
            <option value="13">Musicals & Theatres</option>
          </select>
          {error && category === "" && (
            <p className="error">Category is required.</p>
          )}
        </div>
        <div className="input-group">
          <label htmlFor="difficulty">Difficulty:</label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(event) => {
              setDifficulty(event.target.value);
            }}
          >
            <option value="" className="disabled" disabled selected>
              Please select a difficulty
            </option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          {error && difficulty === "" && (
            <p className="error">Difficulty level is required.</p>
          )}
        </div>
        {error && (user === "" || category === "" || difficulty === "") && (
          <p className="error">
            <b>{error}</b>
          </p>
        )}
        <button>Generate Quiz</button>
      </form>
    </section>
  );
};
