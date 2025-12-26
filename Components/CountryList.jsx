import { useEffect, useState } from "react";
import CountryCard from "./CountryCard";
import CountriesListShimmer from "./CountriesListShimmer";

export default function CountryList({ query }) {
  const [CountryData, setCountryData] = useState([]);

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,region,capital,population"
    )
      .then((res) => res.json())
      .then((data) => {
        setCountryData(data);
        // console.log("Total fetched:", data.length); 
      });
  }, []);

  const cleanQuery = query.trim().toLowerCase();

  const filteredCountries = cleanQuery
    ? CountryData.filter((country) =>
        country.name.common.toLowerCase().includes(cleanQuery) || country.region.toLowerCase().includes(cleanQuery)
      )
    : CountryData;

    if(!CountryData.length) {
      return <CountriesListShimmer />
    }

  return (
    <div className="countries-container">
      {filteredCountries.map((country) => (
        <CountryCard
          key={country.name.common}
          name={country.name.common}
          flags={country.flags.svg}
          population={country.population.toLocaleString("en-IN")}
          region={country.region}
          Capital={country.capital?.[0] || "N/A"}
        />
      ))}
    </div>
  );
}
