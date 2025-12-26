import { useNavigate } from "react-router-dom";
import { useTheme } from "../Hooks/UseTheme";

export default function Header() {
  const [isDark, setIsDark] = useTheme();
  const navigate = useNavigate();

  return (
    <header className={`header-container ${isDark ? "dark" : ""}`}>
      <div className="header-content">
        <h2 title="Click to go Back on detail Page" className="heading" onClick={() => navigate(-1)}>
          Where in the World?
        </h2>

        <span
          className="theme-changer"
          onClick={() => setIsDark((prev) => !prev)}
        >
          <i title="Light/Dark mode" className={`fa-solid fa-${isDark ? "sun" : "moon"}`} />
          &nbsp;
        </span>
      </div>
    </header>
  );
}
