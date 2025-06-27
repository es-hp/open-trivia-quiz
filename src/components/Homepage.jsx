import "../index.css";
import { useState } from "react";
import { QuestionForm } from "./QuestionForm";
import { QuizSelectForm } from "./QuizSelectForm";
import { Results } from "./Results";

export const Homepage = () => {
  const [formData, setFormData] = useState({
    user: "",
    category: "",
    difficulty: "",
  });
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");
  const [questions, setQuestions] = useState([]); // All questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = questions[currentQuestionIndex];
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (
      formData.user.trim() === "" ||
      formData.category === "" ||
      formData.difficulty === ""
    ) {
      setError("All fields are required.");
      return false;
    }
    const url = `https://opentdb.com/api.php?amount=10&category=${formData.category}&difficulty=${formData.difficulty}&type=multiple&encode=url3986`;

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
          ...question,
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

  const updateValue = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTryAgain = () => {
    setFormData((prev) => ({
      ...prev,
      category: "",
      difficulty: "",
    }));
    setCategoryName("");
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setLoading(false);
    setError("");
    setFormSubmitted(false);
    setQuizCompleted(false);
  };

  return (
    <section id="page-content">
      <h1 id="page-heading">Open Trivia Database Quiz</h1>

      {!formSubmitted && (
        <QuizSelectForm
          formData={formData}
          updateValue={updateValue}
          setCategoryName={setCategoryName}
          handleFormSubmit={handleFormSubmit}
          error={error}
        />
      )}

      {formSubmitted && currentQuestionIndex < questions.length && (
        <QuestionForm
          formData={formData}
          questions={questions}
          categoryName={categoryName}
          currentQuestionIndex={currentQuestionIndex}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          currentQuestion={currentQuestion}
          loading={loading}
          error={error}
          setScore={setScore}
          setQuizCompleted={setQuizCompleted}
        />
      )}
      {formSubmitted && quizCompleted && (
        <Results
          formData={formData}
          score={score}
          questions={questions}
          categoryName={categoryName}
          handleTryAgain={handleTryAgain}
        />
      )}
    </section>
  );
};
