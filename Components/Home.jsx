import "../App.css";
import SearchBar from "../Components/SearchBar";
import SelectMenu from "../Components/SelectMenu";
import CountryList from "../Components/CountryList";
import { useState } from "react";
// import { useWindowSize } from "../Hooks/useWindowSize";
import { useTheme } from "../Hooks/UseTheme";

export default function Home() {
  const [query, setQuery] = useState("");
  const [isDark] = useTheme()
  // const windowSize = useWindowSize();

  return (
    <main id="maintag" className={isDark ? "dark" : ""}>
      <div className="search-filter-Container">
        <SearchBar setQuery={setQuery} />
        <SelectMenu setQuery={setQuery} />
      </div>

      {/* <h2 style={{ textAlign: "center" }}>
        {windowSize.width} x {windowSize.height}
      </h2> */}

      <CountryList query={query} />
    </main>
  );
}
