import React from "react";
import "../App.css";
import { useDarkMode } from "./DarkMode/DarkModeContext";

function AllQuestions({ data, onClick }) {
  const { darkMode } = useDarkMode();
  return (
    <div className="question-lists">
      {data.questions.map((question) => (
        <div className="question" key={question.questionNo}>
          <div
            className={
              darkMode ? "question-number dark-mode-qno" : "question-number"
            }
            onClick={() => onClick(question.questionNo)}
          >
            {question.questionNo}
          </div>
          <div
            className="question-name"
            onClick={() => onClick(question.questionNo)}
          >
            {question.questionName}
          </div>
        </div>
      ))}
    </div>
  );
}
export default AllQuestions;
