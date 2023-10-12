import React, { useState, useEffect } from "react";
import NumberBox from "./NumberBox";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { useDarkMode } from "./DarkMode/DarkModeContext";

function NumberSelector({ data }) {
  let { questionNo } = useParams();
  // Convert the string to a number
  questionNo = parseInt(questionNo, 10);

  const findQuestionName = (questionNo) => {
    const selectedQuestion = data.questions.find(
      (question) => question.questionNo === questionNo
    );
    return selectedQuestion
      ? selectedQuestion.questionName
      : "Question Not Found";
  };
  const questionName = findQuestionName(questionNo);
  const [numberList, setNumberList] = useState([]);
  const { darkMode } = useDarkMode();

  const getRandomAnswer = () => {
    // Find all answer for the given questionNo
    const answersForQuestion = data.answers.filter(
      (answer) => answer.questionNo === questionNo
    );

    if (answersForQuestion.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * answersForQuestion.length);
    return answersForQuestion[randomIndex].answerResult;
  };

  const handleBlockClick = async (selectedQuestionNo) => {
    // Generate the answer
    const answer = getRandomAnswer(selectedQuestionNo);

    // Navigate to the AnswerPage with the answer as a parameter
    navigate(
      `/answer/${selectedQuestionNo}?answer=${encodeURIComponent(answer)}`
    );
  };

  useEffect(() => {
    // Set the initial number list from data
    setNumberList(data.numberList);
  }, [data]);

  const navigate = useNavigate();
  const back = () => {
    navigate("/");
  };

  return (
    <div className={darkMode ? "dark-mode number-selector" : "number-selector"}>
      <button className="back-button" onClick={back}>
        နောက်သို့
      </button>
      <p className="question-name-number-selector">{questionName}</p>
      <div className="grid-container">
        {numberList.map((number, index) => (
          <NumberBox key={index} number={number} onSelect={handleBlockClick} />
        ))}
      </div>
    </div>
  );
}

export default NumberSelector;
