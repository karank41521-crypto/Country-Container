import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./CountryDetail.css";
import { useTheme } from "../Hooks/UseTheme";

export default function CountryDetail() {
  const [isDark] = useTheme()
  const { country } = useParams();
  const navigate = useNavigate();

  const [countriesData, setCountriesData] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!country) return;

    fetch(
      `https://restcountries.com/v3.1/name/${decodeURIComponent(
        country
      )}?fullText=true`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Country not found");
        }
        return res.json();
      })
      .then(([countryData]) => {
        if (!countryData) {
          setNotFound(true);
          return;
        }

        setCountriesData({
          Flag: countryData.flags.svg,
          name: countryData.name.common,
          NativeName:
            Object.values(countryData.name.nativeName || {})[0]?.common ||
            "N/A",
          Population: countryData.population.toLocaleString("en-IN"),
          Region: countryData.region,
          SubRegion: countryData.subregion,
          Capital: countryData.capital?.[0] || "N/A",
          TopLevelDomain: countryData.tld?.join(", "),
          Currencies: Object.values(countryData.currencies || {})
            .map((c) => c.name)
            .join(", "),
          Language: Object.values(countryData.languages || {}).join(", "),
          borders: [],
        });

        countryData.borders.map((border) => {
          fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then((res) => res.json())
            .then(([borderCountry]) => {
              setCountriesData((prevState) => ({
                ...prevState,
                borders: [...prevState.borders, borderCountry.name.common],
              }));
            });
        });
        
      })
      .catch(() => {
        setNotFound(true);
      });
  }, [country]);

  if (notFound) {
    return (
      <main className={`${isDark? 'dark': ''}`}>
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
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!countriesData) return ( <h3>Loading..............</h3> );

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
