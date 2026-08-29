import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const ThemeProvider = ({ children }) => {
  const theme = useSelector((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme.mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme.mode]);

  return (
    <div className={theme.mode === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-slate-950 dark:text-slate-100 antialiased transition-colors duration-200">
        {children}
      </div>
    </div>
  );
};

export default ThemeProvider;
