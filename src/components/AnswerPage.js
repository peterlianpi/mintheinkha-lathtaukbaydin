import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";
import { useDarkMode } from "../DarkModeContext";
import Logo from "../mintheinkha_logo.png";

function AnswerPage({ data }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode } = useDarkMode();

  // Extract the answer from the URL query paramenter
  const queryParams = new URLSearchParams(location.search);
  const answer = queryParams.get("answer");

  const home = () => {
    navigate("/");
  };

  return (
    <div className={darkMode ? "dark-mode number-selector" : "number-selector"}>
      <img src={Logo} alt="Logo" className="logo-img" />
      <h1>လက်ထောက်ဗေဒင်</h1>
      <p className="answer">{answer}</p>
      <button className="back-button" onClick={home}>
        နောက်သို့
      </button>
    </div>
  );
}

export default AnswerPage;
