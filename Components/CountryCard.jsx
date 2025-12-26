import { Link } from "react-router-dom";

export default function CountryCard({ name, flags, population, region, Capital }) {
  return (
    <Link className="countries-flag" to={`/${encodeURIComponent(name)}`}>
      <img
        src={flags || "https://via.placeholder.com/250x166?text=No+Image"}
        alt={`${name || "N/A"} Flag`}
      />
      <div className="flag-text">
        <h3 className="title">{name || "N/A"}</h3>
        <p><b>Population: </b>{population || "N/A"}</p>
        <p><b>Region: </b>{region || "N/A"}</p>
        <p><b>Capital: </b>{Capital || "N/A"}</p>
      </div>
    </Link>
  );
}
