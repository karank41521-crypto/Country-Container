import React from "react";

import "./CountriesListShimmer.css";

export default function CountriesListShimmer() {
  // new Array(10).fill('')

  return (
    <div className="countries-container">
      {Array.from({ length: 10 }).map((el, i) => {
        return (
          <div key={i} className="countries-flag shimmer-card">
            <a className="countries-flag" href="/Antigua%20and%20Barbuda">
              <img className="flag-container"/>
              <div className="flag-text">
                <h3 className ="title"></h3>
                <p></p>
                <p></p>
                <p></p>
              </div>
            </a>
          </div>
        );
      })}
    </div>
  );
}
