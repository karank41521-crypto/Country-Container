import { useEffect, useState } from "react";
import Papa from "papaparse";
import csvFile from "url:../world_countries_dataset.csv";

import CountryCard from "./CountryCard";
import CountriesListShimmer from "./CountriesListShimmer";

export default function CountryList({ query }) {
  const [CountryData, setCountryData] = useState([]);

  useEffect(() => {
    Papa.parse(csvFile, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        console.log(result.data);
        setCountryData(result.data);
      },
      error: (err) => {
        console.log("CSV Error:", err);
      },
    });
  }, []);

  const cleanQuery = query.trim().toLowerCase();

  const filteredCountries = cleanQuery
    ? CountryData.filter(
      (country) =>
        country.Name?.toLowerCase().includes(cleanQuery) ||
        country.Region?.toLowerCase().includes(cleanQuery)
    )
    : CountryData;

  if (!CountryData.length) {
    return <CountriesListShimmer />;
  }

  return (
    <div className="countries-container">
      {filteredCountries.map((country) => (
        <CountryCard
          key={country.Name}
          name={country.Name}
          flags={country.Flag}
          population={
            country.Population
              ? Number(country.Population).toLocaleString("en-IN")
              : "N/A"
          }
          region={country.Region}
          Capital={country.Capital}
        />
      ))}
    </div>
  );
}