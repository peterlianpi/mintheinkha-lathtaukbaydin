// DarkModeToggle.js
import React, { useEffect } from "react";
import { useDarkMode } from "./DarkModeContext";
import Sun from "./components/img/sun.svg"; // Replace with the correct path to your sun.svg file
import Moon from "./components/img/moon.svg"; // Replace with the correct path to your moon.svg file
import "./DarkModeToggle.css";
import "./App.css";

function DarkModeToggle() {
  const { toggleDarkMode } = useDarkMode();
  const sunIcon = Sun; // Use the imported SVG directly
  const moonIcon = Moon; // Use the imported SVG directly

  useEffect(() => {
    var theme = "dark";
    const root = document.querySelector(":root");
    const container = document.getElementsByClassName("theme-container")[0];
    const themeIcon = document.getElementById("theme-icon");

    container.addEventListener("click", setTheme);

    function setTheme() {
      switch (theme) {
        case "dark":
          setLight();
          theme = "light";
          break;
        case "light":
          setDark();
          theme = "dark";
          break;
        default:
          break;
      }
    }
    function setLight() {
      root.style.setProperty(
        "--bs-dark",
        "linear-gradient(318.32deg, #c3d1e4 0%, #dde7f3 55%, #d4e0ed 100%)"
      );
      container.classList.remove("shadow-dark");
      setTimeout(() => {
        container.classList.add("shadow-light");
        themeIcon.classList.remove("change");
      }, 300);
      themeIcon.classList.add("change");
      themeIcon.src = sunIcon;
      toggleDarkMode(); // Trigger the toggleDarkMode function when switching to light mode
    }

    function setDark() {
      root.style.setProperty("--bs-dark", "#212529");
      container.classList.remove("shadow-light");
      setTimeout(() => {
        container.classList.add("shadow-dark");
        themeIcon.classList.remove("change");
      }, 300);
      themeIcon.classList.add("change");
      themeIcon.src = moonIcon;
      toggleDarkMode(); // Trigger the toggleDarkMode function when switching to dark mode
    }

    // Cleanup event listener when the component unmounts
    return () => {
      container.removeEventListener("click", setTheme);
    };
  }, [sunIcon, moonIcon, toggleDarkMode]);

  return (
    <div className="dark-mode-toggle">
      <div className="theme-container">
        <img
          id="theme-icon"
          src={moonIcon} // Set the initial icon based on the theme
          alt="Theme Icon"
        />
      </div>
    </div>
  );
}

export default DarkModeToggle;
