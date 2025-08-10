import { useState, useEffect } from "react";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex items-center justify-center flex-col">
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="mb-6 p-3 rounded bg-gray-200 dark:bg-gray-800 text-lg"
      >
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </button>
      <h1 className="text-3xl">Hello, this is a {theme} theme!</h1>
    </div>
  );
}

export default App;
