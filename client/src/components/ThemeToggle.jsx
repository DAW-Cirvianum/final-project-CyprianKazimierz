import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [darkMode, setDarkMode] = useState(false);
    /* Load from localStorage theme if is black change class to dark */
    useEffect(() => {
        const theme = localStorage.getItem("theme");

        if (theme === "dark") {
            document.documentElement.classList.add("dark");
            setDarkMode(true);
        }
    }, []);

    /**
     * Function to toggle themes dark or light
     */
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
