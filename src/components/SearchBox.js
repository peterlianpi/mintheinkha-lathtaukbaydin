import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import AllQuestions from "./AllQuestions";
import Logo from "../mintheinkha_logo.png";
import { useDarkMode } from "./DarkMode/DarkModeContext";
import "./DarkMode/DarkModeToggle.css";

function SearchBox({ data }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedQuestionName, setSelectedQuestionName] = useState("");
  const { darkMode } = useDarkMode();
  const [suggestions, setSuggestions] = useState([]);

  // Function to handle when a question is clicked
  const handleQuestionClick = (questionNo) => {
    navigate(`/numberselector/${questionNo}`);
  };

  const updateSuggestions = (query) => {
    const filteredQuestions = data.questions.filter((question) =>
      question.questionName.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(filteredQuestions);
  };

  const handleSearch = () => {
    const selectedQuestionNo = parseInt(searchQuery);

    if (!isNaN(selectedQuestionNo)) {
      navigate(`/numberselector/${selectedQuestionNo}`);
      // Work...
    } else if (suggestions.length > 0) {
      // If suggestions are available, take the first suggestion
      const selectedQuestion = suggestions[0];
      navigate(`/numberselector/${selectedQuestion.questionNo}`);
      setSelectedQuestionName(selectedQuestion.questionName);
    } else {
      alert("Question not found");
    }
  };

  return (
    <div className={darkMode ? "dark-mode main" : "main"}>
      <img
        src={Logo}
        alt="Logo"
        className={darkMode ? "logo-img logo-outline" : "logo-img"}
      />
      <h1 className="header">လက်ထောက်ဗေဒင်</h1>
      <input
        className="input"
        type="text"
        placeholder="သိလိုသော မေးခွန်းအား ရှာဖွေပါ..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          updateSuggestions(e.target.value);
        }}
        list="suggestions"
        onInput={(e) => {
          const selectedQuestion = suggestions.find(
            (question) => question.questionName === e.target.value
          );
          if (selectedQuestion) {
            setSelectedQuestionName(selectedQuestion.questionNames);
            navigate(`/numberselector/${selectedQuestion.questionNo}`);
          }
        }}
      />
      <datalist id="suggestions">
        {suggestions.map((question) => (
          <option
            key={question.questionNo}
            value={question.questionName}
          ></option>
        ))}
      </datalist>

      <button className="search" onClick={handleSearch}>
        Search
      </button>
      {selectedQuestionName && <p>Selected Question: {selectedQuestionName}</p>}

      <AllQuestions data={data} onClick={handleQuestionClick} />

      <footer
        className={darkMode ? "footer-bar footer-bar-dark" : "footer-bar"}
      >
        <div>
          made with ❤ by <a href="https://www.facebook.com/p.lianpi">Peter</a>
        </div>
      </footer>
    </div>
  );
}

export default SearchBox;
