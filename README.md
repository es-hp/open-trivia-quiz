# Open Trivia Database Quiz App in React

Coding Temple - React Module: Open Trivia Database Quiz App

## Homepage.jsx

- State object created with user/name, category, and difficulty.
- Other useState variables created

### "handleFormSubmit"

- validation (no empty fields allowed)
- creates the necessary url depending on user selection
- triggers "fetchQuizData"

### "shuffle"

- Simple way to randomize order of answer choices

### "fetchQuizData"

- async function to get data from API and convert it to JSON and then decode it from URL encoding. Updates variables with the data.

### "updateValue"

- Global function for updating values in state object.

### "handleTryAgain"

- Function later triggered at the end of the quiz on the Results page to reset quiz and form.
- I decided to not reset the user name so that it's already filled out with previous input so the user doesn't have to re-enter their name.

## QuizSelectForm.jsx

- Has input for user's name, quiz category, and difficulty, which updates the formData object.
- Shows error if any fields are left empty/unselected.

## QuestionForm.jsx

- Returns one question at a time.
  - Category and difficulty shown on top left of each question.
  - Question number and question is shown.
  - Multiple choice answers mapped from data -> currentQuestion
    - Choices disabled once an answer is submitted.
  - Button changes after answer is submitted to get next question.

### "handleAnswerSubmit"

- Includes validation so that an answer is always selected, otherwise a feedback message shows.
- Checks if answer is correct or not.
- Respective feedback is given depending on if answer is correct or not.
- Keeps score by adding 1 every time answer is correct.
- showAnswer State updated.

### "handleNext"

- Sets actions for moving on to the next question on button click.

## Results.jsx

- Shows user name, category, difficulty, and score.
- Button triggering "handleTryAgain"
