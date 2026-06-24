import { Link } from "react-router-dom";

export default function CountryCard({
  name,
  flags,
  population,
  region,
  Capital,
}) {
  return (
    <Link
      className="countries-flag"
      to={`/${encodeURIComponent(name)}`}
    >
      <img
        src={flags}
        alt={name}
        loading="lazy"
      />

      <div className="flag-text">
        <h3 className="title">{name || "N/A"}</h3>

        <p>
          <b>Population: </b>
          {population}
        </p>

        <p>
          <b>Region: </b>
          {region || "N/A"}
        </p>

        <p>
          <b>Capital: </b>
          {Capital || "N/A"}
        </p>
      </div>
    </Link>
  );
}