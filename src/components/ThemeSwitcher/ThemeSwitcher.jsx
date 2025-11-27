import {useEffect, useState} from "react";
import {XMarkIcon, SunIcon, MoonIcon, SwatchIcon} from "@heroicons/react/20/solid/index.js";
import useLocalStorage from "../../hooks/useLocalStorage.jsx";
import styles from "./ThemeSwitcher.module.css";

const ThemeSwitcher = () => {
  const [hue, setHue] = useLocalStorage("react-todo.color", "240");
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage("react-todo-theme",
    defaultDark ? "dark" : "light");
  const [isColorPicking, setIsColorPicking] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('color-scheme', theme);
  }, [theme])

  useEffect(() => {
    document.documentElement.style.setProperty('--hue', hue);
  }, [hue])

  return (
    <aside
      className={styles.wrapper}
      style={{
        backgroundColor: isColorPicking
          ? "hsl(var(--muted) / .6)"
          : "transparent"
      }}
    >
      {isColorPicking ? (
        <>
          <button
            className={`btn ${styles.close}`}
            aria-label="Close color picker mode"
            onClick={() => setIsColorPicking(false)}
          >
            <XMarkIcon />
          </button>
          <input
            className={styles.picker}
            type="range"
            min="0"
            max="360"
            aria-label="Change color theme slider"
            onInput={(e) => setHue(e.target.value)}
          />
        </>
      )
        : (
          <div className={styles.btns}>
            <button
              className="btn"
              aria-label={`Change them to ${theme === "light" ? "light" : "light"} mode`}
              role="switch"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>
            <button
              className="btn"
              aria-label="Enable color picking mode"
              onClick={() => setIsColorPicking(true)}
            >
              <SwatchIcon />
            </button>
          </div>
        )
      }
    </aside>
  )
}

export default ThemeSwitcher;
