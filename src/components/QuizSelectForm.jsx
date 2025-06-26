export const QuizSelectForm = ({
  formData,
  updateValue,
  setCategoryName,
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
            name="user"
            value={formData.user}
            onChange={updateValue}
          />
          {error && formData.user === "" && (
            <p className="error">Name is required.</p>
          )}
        </div>
        <div className="input-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={(event) => {
              updateValue(event);
              const selectedIndex = event.target.selectedIndex;
              const selectedOption = event.target.options[selectedIndex];
              setCategoryName(selectedOption.text);
            }}
          >
            <option value="" disabled>
              Please select a category
            </option>
            <option value="15">Video Games</option>
            <option value="16">Board Games</option>
            <option value="31">Anime & Manga</option>
            <option value="13">Musicals & Theatres</option>
          </select>
          {error && formData.category === "" && (
            <p className="error">Category is required.</p>
          )}
        </div>
        <div className="input-group">
          <label htmlFor="difficulty">Difficulty:</label>
          <select
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={updateValue}
          >
            <option value="" disabled>
              Please select a difficulty
            </option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          {error && formData.difficulty === "" && (
            <p className="error">Difficulty level is required.</p>
          )}
        </div>
        {error &&
          (formData.user === "" ||
            formData.category === "" ||
            formData.difficulty === "") && (
            <p className="error">
              <b>{error}</b>
            </p>
          )}
        <button>Generate Quiz</button>
      </form>
    </section>
  );
};
