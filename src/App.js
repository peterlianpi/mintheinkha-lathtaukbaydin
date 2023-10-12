import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/SearchBox";
import NumberSelector from "./components/NumberSelector";
import AnswerPage from "./components/AnswerPage";
import { DarkModeProvider } from "./components/DarkMode/DarkModeContext";
import DarkModeToggle from "./components/DarkMode/DarkModeToggle";
import "./App.css";
import Nodata from "./components/DarkMode/img/download.png";

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch data.json when the component mounts
    fetch("data.json")
      .then((res) => res.json())
      .then((jsonData) => {
        setData(jsonData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p className="loader"></p>;
  if (!data) {
    return (
      <div class="empty-state">
        <div class="empty-state__content">
          <div class="empty-state__icon">
            <img src={Nodata} alt="no-data" />
          </div>
          <div class="empty-state__message">No records has been added yet.</div>
          <div class="empty-state__help">
            Add a new record by simpley clicking the button on top right side.
          </div>
        </div>
      </div>
    );
  }

  return (
    <DarkModeProvider>
      <BrowserRouter>
        <div>
          <DarkModeToggle />
        </div>
        <Routes>
          <Route path="/" exact element={<Home data={data} />} />
          <Route
            path="/numberselector/:questionNo"
            element={<NumberSelector data={data} />}
          />
          <Route
            path="/answer/:questionNo"
            element={<AnswerPage data={data} />}
          />
        </Routes>
      </BrowserRouter>
    </DarkModeProvider>
  );
}

export default App;
