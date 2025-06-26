import "../index.css";
import { useState } from "react";
import { QuestionForm } from "./QuestionForm";
import { QuizSelectForm } from "./QuizSelectForm";
import { Results } from "./Results";

export const Homepage = () => {
  const [user, setUser] = useState("");
  const [category, setCategory] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState("");
  const [questions, setQuestions] = useState([]); // All questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = questions[currentQuestionIndex];
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (user.trim() === "" || category === "" || difficulty === "") {
      setError("All fields are required.");
      return false;
    }
    const url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple&encode=url3986`;

    fetchQuizData(url);
    setError("");
    setFormSubmitted(true);
    return true;
  };

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  const fetchQuizData = async (url) => {
    setLoading(true);

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to load questions.");
      }

      const data = await response.json();

      const quizData = data.results.map((question) => {
        const decodedQuestion = decodeURIComponent(question.question);
        const correct = decodeURIComponent(question.correct_answer);
        const incorrect = question.incorrect_answers.map((answer) =>
          decodeURIComponent(answer)
        );

        const allAnswers = shuffle([...incorrect, correct]);

        return {
          // Returns new object with existing object "question", and then adds a new properties after.
          ...question, // Spread operator (...) = Take all the key-value pairs inside the object and copy them into this new object.
          question: decodedQuestion,
          correct_answer: correct,
          incorrect_answers: incorrect,
          answers: allAnswers,
        };
      });

      setQuestions(quizData);
      setError("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTryAgain = () => {
    setFormSubmitted(false);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setCategory("");
    setDifficulty("");
    setError("");
  };

  return (
    <section id="page-content">
      <h1 id="page-heading">Open Trivia Database Quiz</h1>

      {!formSubmitted && (
        <QuizSelectForm
          user={user}
          setUser={setUser}
          category={category}
          setCategory={setCategory}
          setCategoryName={setCategoryName}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          handleFormSubmit={handleFormSubmit}
          error={error}
        />
      )}

      {formSubmitted && currentQuestionIndex < questions.length && (
        <QuestionForm
          currentQuestionIndex={currentQuestionIndex}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          currentQuestion={currentQuestion}
          loading={loading}
          error={error}
          setScore={setScore}
        />
      )}
      {formSubmitted && currentQuestionIndex >= questions.length && (
        <Results
          user={user}
          score={score}
          questions={questions}
          categoryName={categoryName}
          difficulty={difficulty}
          handleTryAgain={handleTryAgain}
        />
      )}
    </section>
  );
};
