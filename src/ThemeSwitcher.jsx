import React, { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
      setIsDarkMode(storedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    const newTheme = isDarkMode ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="mb-4 p-2 rounded bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
    >
      Switch to {isDarkMode ? "Light" : "Dark"} Mode
    </button>
  );
};

export default ThemeSwitcher;
