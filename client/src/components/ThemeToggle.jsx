import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const theme = localStorage.getItem("theme");

        if (theme === "dark") {
            document.documentElement.classList.add("dark");
            setDarkMode(true);
        }
    }, []);

    const toggleTheme = () => {
        const isDark = !darkMode;
        setDarkMode(isDark);

        document.documentElement.classList.toggle("dark");

        localStorage.setItem("theme", isDark ? "dark" : "light");
    };

    return (
        <button onClick={toggleTheme}>
            {darkMode ? "☀️" : "🌙"}
        </button>
    );
}
