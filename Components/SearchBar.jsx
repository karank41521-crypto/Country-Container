export default function SearchBar({ setQuery }) {
  return (
    <div className="Search-Container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-search-icon lucide-search"
      >
        <path d="m21 21-4.34-4.34" />
        <circle cx={11} cy={11} r={8} />
      </svg>
      <input
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
        type="text"
        placeholder="Search for a country or region........."
      />
    </div>
  );
}
