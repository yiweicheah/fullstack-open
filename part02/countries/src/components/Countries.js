import { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState([]);
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&APPID=${apiKey}`
      )
      .then((res) => setWeather(res.data));
  }, [capital, apiKey]);

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>temperature {weather.main?.temp} Celcius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="weather"
      />
      <p>wind {weather.wind?.speed} m/s</p>
    </div>
  );
};

const Country = ({ country, type }) => {
  const [info, setInfo] = useState(false);

  const handleToggle = () => {
    setInfo(!info);
  };

  if (type === "multiple") {
    return (
      <div>
        <p>
          {country.name.common}{" "}
          <button onClick={handleToggle}>{info ? "hide" : "show"}</button>
        </p>
        <div style={{ display: info ? "" : "none", paddingLeft: "20px" }}>
          <div>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
          </div>
          <div>
            <h3>languages:</h3>
            <ul>
              {Object.values(country.languages).map((language, i) => (
                <li key={i}>{language}</li>
              ))}
            </ul>
          </div>
          <img src={country.flags.png} alt="flag" />
        </div>
      </div>
    );
  } else if (type === "single") {
    return (
      <div>
        <h1>{country.name.common}</h1>
        <div style={{ paddingLeft: "20px" }}>
          <div>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
          </div>
          <div>
            <h3>languages:</h3>
            <ul>
              {Object.values(country.languages).map((language, i) => (
                <li key={i}>{language}</li>
              ))}
            </ul>
          </div>
          <img src={country.flags.png} alt="flag" />
          <Weather capital={country.capital[0]} />
        </div>
      </div>
    );
  }
};

export const Countries = ({ countries, search }) => {
  const renderedCountries = () => {
    if (!search) {
      return <p>Please use the search function</p>;
    } else if (countries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else if (countries.length === 1) {
      return <Country country={countries[0]} type="single" />;
    } else if (countries.length <= 10) {
      return countries.map((country, i) => (
        <Country country={country} key={i} type="multiple" />
      ));
    }
  };

  return <div>{renderedCountries()}</div>;
};
