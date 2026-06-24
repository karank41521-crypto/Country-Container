import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./CountryDetail.css";
import { useTheme } from "../Hooks/UseTheme";
import countries from "../countries.json";
import Papa from "papaparse";
import csvFile from "url:../world_countries_dataset.csv";

export default function CountryDetail() {
  const [isDark] = useTheme()
  const { country } = useParams();
  const navigate = useNavigate();

  const [countriesData, setCountriesData] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!country) return;

    Papa.parse(csvFile, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const countryName = decodeURIComponent(country).toLowerCase();

        const csvCountry = result.data.find(
          (c) => c.Name?.toLowerCase() === countryName
        );

        const jsonCountry = countries.find(
          (c) => c.name?.common?.toLowerCase() === countryName
        );

        if (!csvCountry && !jsonCountry) {
          setNotFound(true);
          return;
        }

        const borderCountries =
          jsonCountry?.borders
            ?.map(
              (borderCode) =>
                countries.find((c) => c.cca3 === borderCode)?.name?.common
            )
            .filter(Boolean) || [];

        setCountriesData({
          Flag:
            csvCountry?.Flag ||
            jsonCountry?.flag ||
            "🏳️",

          name:
            csvCountry?.Name ||
            jsonCountry?.name?.common ||
            "N/A",

          NativeName:
            Object.values(jsonCountry?.name?.native || {})[0]?.common ||
            csvCountry?.Name ||
            "N/A",

          Population:
            csvCountry?.Population
              ? Number(csvCountry.Population).toLocaleString("en-IN")
              : "N/A",

          Region:
            csvCountry?.Region ||
            jsonCountry?.region ||
            "N/A",

          SubRegion:
            csvCountry?.Subregion ||
            jsonCountry?.subregion ||
            "N/A",

          Capital:
            csvCountry?.Capital ||
            jsonCountry?.capital?.[0] ||
            "N/A",

          TopLevelDomain:
            jsonCountry?.tld?.join(", ") ||
            "N/A",

          Currencies:
            csvCountry?.Currencies ||
            Object.values(jsonCountry?.currencies || {})
              .map((c) => c.name)
              .join(", ") ||
            "N/A",

          Language:
            csvCountry?.Languages ||
            Object.values(jsonCountry?.languages || {}).join(", ") ||
            "N/A",

          borders: borderCountries,
        });
      },
    });
  }, [country]);

  if (notFound) {
    return (
      <main className={`${isDark ? "dark" : ""}`}>
        <div className="country-details-container">
          <span className="Back-button" onClick={() => navigate(-1)}>
            <i className="fa-solid fa-arrow-left" />
            &nbsp;&nbsp;Back
          </span>

          <h2>Country Not Found</h2>
        </div>
      </main>
    );
  }

  if (!countriesData) return (<h3>Loading..............</h3>);

  return (
    <main>
      <div className="country-details-container">
        <span className="Back-button" onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left" />
          &nbsp;&nbsp;Back
        </span>

        <div className="details-container">
          <img src={countriesData.Flag} alt="" loading="lazy" />

          <div className="text-container">
            <h2 className="Country-Heading">{countriesData.name}</h2>

            <div className="detail-text">
              <p>
                <b>Native Name: </b>
                {countriesData.NativeName}
              </p>
              <p>
                <b>Population: </b>
                {countriesData.Population}
              </p>
              <p>
                <b>Region: </b>
                {countriesData.Region}
              </p>
              <p>
                <b>Sub-Region: </b>
                {countriesData.SubRegion}
              </p>
              <p>
                <b>Capital: </b>
                {countriesData.Capital}
              </p>
              <p>
                <b>Top-Level-Domain: </b>
                {countriesData.TopLevelDomain}
              </p>
              <p>
                <b>Currencies: </b>
                {countriesData.Currencies}
              </p>
              <p>
                <b>Language: </b>
                {countriesData.Language}
              </p>
            </div>
            {
              <div className="footer">
                {countriesData.borders.length !== 0 && (
                  <div className="Border-container">
                    <b>Border Countries:</b>
                    {countriesData.borders.map((border) => (
                      <Link key={border} to={`/${border}`}>
                        {" "}
                        {border}{" "}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            }
          </div>
        </div>
      </div>
    </main>
  );
}
