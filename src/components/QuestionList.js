import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";
import QuestionForm from "./QuestionForm";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, []);

  function createQuestion(newQuestion) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuestion),
    };

    fetch("http://localhost:4000/questions", requestOptions)
      .then((response) => response.json())
      .then((createdQuestion) => {
        setQuestions([...questions, createdQuestion]);
      })
      .catch((error) => {
        console.error("Error creating question:", error);
      });
  }

  function deleteQuestion(id) {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    fetch(`http://localhost:4000/questions/${id}`, requestOptions)
      .then((response) => response.json())
      .then(() => {
        setQuestions(questions.filter((question) => question.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting question:", error);
      });
  }

  function updateQuestion(id, correctIndex) {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        correctIndex: correctIndex,
      }),
    };

    fetch(`http://localhost:4000/questions/${id}`, requestOptions)
      .then((response) => response.json())
      .then((updatedQuestion) => {
        setQuestions((prevQuestions) =>
          prevQuestions.map((question) =>
            question.id === id ? updatedQuestion : question
          )
        );
      })
      .catch((error) => {
        console.error("Error updating question:", error);
      });
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <QuestionForm onSubmit={createQuestion} />
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={deleteQuestion}
            updateQuestionList={updateQuestion}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;