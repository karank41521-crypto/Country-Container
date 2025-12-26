import { useEffect, useState } from "react";

export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("isDarkmode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("isDarkmode", isDark);
    document.body.classList.toggle("dark", isDark);
  }, [isDark]);

  return [isDark, setIsDark];
}
